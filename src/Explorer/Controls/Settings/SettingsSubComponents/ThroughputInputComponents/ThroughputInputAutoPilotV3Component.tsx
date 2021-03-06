import React from "react";
import * as AutoPilotUtils from "../../../../../Utils/AutoPilotUtils";
import {
  getTextFieldStyles,
  getToolTipContainer,
  spendAckCheckBoxStyle,
  titleAndInputStackProps,
  checkBoxAndInputStackProps,
  getChoiceGroupStyles,
  messageBarStyles,
  getEstimatedSpendElement,
  getEstimatedAutoscaleSpendElement,
  getAutoPilotV3SpendElement,
  manualToAutoscaleDisclaimerElement
} from "../../SettingsRenderUtils";
import {
  Text,
  TextField,
  ChoiceGroup,
  IChoiceGroupOption,
  Checkbox,
  Stack,
  Label,
  Link,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { ToolTipLabelComponent } from "../ToolTipLabelComponent";
import { IsComponentDirtyResult, isDirty } from "../../SettingsUtils";
import * as SharedConstants from "../../../../../Shared/Constants";
import * as DataModels from "../../../../../Contracts/DataModels";

export interface ThroughputInputAutoPilotV3Props {
  databaseAccount: DataModels.DatabaseAccount;
  serverId: string;
  throughput: number;
  throughputBaseline: number;
  onThroughputChange: (newThroughput: number) => void;
  minimum: number;
  maximum: number;
  step?: number;
  isEnabled?: boolean;
  spendAckChecked?: boolean;
  spendAckId?: string;
  spendAckText?: string;
  spendAckVisible?: boolean;
  showAsMandatory?: boolean;
  isFixed: boolean;
  isEmulator: boolean;
  label: string;
  infoBubbleText?: string;
  canExceedMaximumValue?: boolean;
  onAutoPilotSelected: (isAutoPilotSelected: boolean) => void;
  isAutoPilotSelected: boolean;
  wasAutopilotOriginallySet: boolean;
  maxAutoPilotThroughput: number;
  maxAutoPilotThroughputBaseline: number;
  onMaxAutoPilotThroughputChange: (newThroughput: number) => void;
  onScaleSaveableChange: (isScaleSaveable: boolean) => void;
  onScaleDiscardableChange: (isScaleDiscardable: boolean) => void;
  getThroughputWarningMessage: () => JSX.Element;
}

interface ThroughputInputAutoPilotV3State {
  spendAckChecked: boolean;
}

export class ThroughputInputAutoPilotV3Component extends React.Component<
  ThroughputInputAutoPilotV3Props,
  ThroughputInputAutoPilotV3State
> {
  private shouldCheckComponentIsDirty = true;
  private static readonly defaultStep = 100;
  private static readonly zeroThroughput = 0;
  private step: number;
  private choiceGroupFixedStyle = getChoiceGroupStyles(undefined, undefined);
  private options: IChoiceGroupOption[] = [
    { key: "true", text: "Autoscale" },
    { key: "false", text: "Manual" }
  ];

  componentDidMount(): void {
    this.onComponentUpdate();
  }

  componentDidUpdate(): void {
    this.onComponentUpdate();
  }

  private onComponentUpdate = (): void => {
    if (!this.shouldCheckComponentIsDirty) {
      this.shouldCheckComponentIsDirty = true;
      return;
    }
    const isComponentDirtyResult = this.IsComponentDirty();
    this.props.onScaleSaveableChange(isComponentDirtyResult.isSaveable);
    this.props.onScaleDiscardableChange(isComponentDirtyResult.isDiscardable);

    this.shouldCheckComponentIsDirty = false;
  };

  public IsComponentDirty = (): IsComponentDirtyResult => {
    let isSaveable = false;
    let isDiscardable = false;

    if (this.props.isEnabled) {
      if (this.hasProvisioningTypeChanged()) {
        isSaveable = true;
        isDiscardable = true;
      } else if (this.props.isAutoPilotSelected) {
        if (isDirty(this.props.maxAutoPilotThroughput, this.props.maxAutoPilotThroughputBaseline)) {
          isDiscardable = true;
          if (AutoPilotUtils.isValidAutoPilotThroughput(this.props.maxAutoPilotThroughput)) {
            isSaveable = true;
          }
        }
      } else {
        if (isDirty(this.props.throughput, this.props.throughputBaseline)) {
          isDiscardable = true;
          isSaveable = true;
          if (
            !this.props.throughput ||
            this.props.throughput < this.props.minimum ||
            (this.props.throughput > this.props.maximum && (this.props.isEmulator || this.props.isFixed)) ||
            (this.props.throughput > SharedConstants.CollectionCreation.DefaultCollectionRUs1Million &&
              !this.props.canExceedMaximumValue)
          ) {
            isSaveable = false;
          }
        }
      }
    }
    return { isSaveable, isDiscardable };
  };

  public constructor(props: ThroughputInputAutoPilotV3Props) {
    super(props);
    this.state = {
      spendAckChecked: this.props.spendAckChecked
    };

    this.step = this.props.step ?? ThroughputInputAutoPilotV3Component.defaultStep;
  }

  public hasProvisioningTypeChanged = (): boolean =>
    this.props.wasAutopilotOriginallySet !== this.props.isAutoPilotSelected;

  public overrideWithAutoPilotSettings = (): boolean =>
    this.hasProvisioningTypeChanged() && this.props.wasAutopilotOriginallySet;

  public overrideWithProvisionedThroughputSettings = (): boolean =>
    this.hasProvisioningTypeChanged() && !this.props.wasAutopilotOriginallySet;

  private getRequestUnitsUsageCost = (): JSX.Element => {
    const account = this.props.databaseAccount;
    if (!account) {
      return <></>;
    }

    const serverId: string = this.props.serverId;
    const offerThroughput: number = this.props.throughput;

    const regions = account?.properties?.readLocations?.length || 1;
    const multimaster = account?.properties?.enableMultipleWriteLocations || false;

    let estimatedSpend: JSX.Element;

    if (!this.props.isAutoPilotSelected) {
      estimatedSpend = getEstimatedSpendElement(
        // if migrating from autoscale to manual, we use the autoscale RUs value as that is what will be set...
        this.overrideWithAutoPilotSettings() ? this.props.maxAutoPilotThroughput : offerThroughput,
        serverId,
        regions,
        multimaster,
        false
      );
    } else {
      estimatedSpend = getEstimatedAutoscaleSpendElement(
        this.props.maxAutoPilotThroughput,
        serverId,
        regions,
        multimaster
      );
    }
    return estimatedSpend;
  };

  private getAutoPilotUsageCost = (): JSX.Element => {
    if (!this.props.maxAutoPilotThroughput) {
      return <></>;
    }
    return getAutoPilotV3SpendElement(
      this.props.maxAutoPilotThroughput,
      false /* isDatabaseThroughput */,
      !this.props.isEmulator ? this.getRequestUnitsUsageCost() : <></>
    );
  };

  private onAutoPilotThroughputChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    let newThroughput = parseInt(newValue);
    newThroughput = isNaN(newThroughput) ? ThroughputInputAutoPilotV3Component.zeroThroughput : newThroughput;
    this.props.onMaxAutoPilotThroughputChange(newThroughput);
  };

  private onThroughputChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ): void => {
    let newThroughput = parseInt(newValue);
    newThroughput = isNaN(newThroughput) ? ThroughputInputAutoPilotV3Component.zeroThroughput : newThroughput;

    if (this.overrideWithAutoPilotSettings()) {
      this.props.onMaxAutoPilotThroughputChange(newThroughput);
    } else {
      this.props.onThroughputChange(newThroughput);
    }
  };

  private onChoiceGroupChange = (
    event?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ): void => this.props.onAutoPilotSelected(option.key === "true");

  private renderThroughputModeChoices = (): JSX.Element => {
    const labelId = "settingsV2RadioButtonLabelId";
    return (
      <Stack>
        <Label id={labelId}>
          <ToolTipLabelComponent
            label={this.props.label}
            toolTipElement={getToolTipContainer(this.props.infoBubbleText)}
          />
        </Label>
        {this.overrideWithProvisionedThroughputSettings() && (
          <MessageBar messageBarType={MessageBarType.warning} styles={messageBarStyles}>
            {manualToAutoscaleDisclaimerElement}
          </MessageBar>
        )}
        <ChoiceGroup
          selectedKey={this.props.isAutoPilotSelected.toString()}
          options={this.options}
          onChange={this.onChoiceGroupChange}
          required={this.props.showAsMandatory}
          ariaLabelledBy={labelId}
          styles={this.choiceGroupFixedStyle}
        />
      </Stack>
    );
  };

  private onSpendAckChecked = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean): void =>
    this.setState({ spendAckChecked: checked });

  private renderAutoPilotInput = (): JSX.Element => (
    <>
      <Text>
        Provision maximum RU/s required by this resource. Estimate your required RU/s with
        <Link target="_blank" href="https://cosmos.azure.com/capacitycalculator/">
          {` capacity calculator`}
        </Link>
      </Text>
      <TextField
        label="Max RU/s"
        required
        type="number"
        id="autopilotInput"
        key="auto pilot throughput input"
        styles={getTextFieldStyles(this.props.maxAutoPilotThroughput, this.props.maxAutoPilotThroughputBaseline)}
        disabled={this.overrideWithProvisionedThroughputSettings()}
        step={this.step}
        min={AutoPilotUtils.minAutoPilotThroughput}
        value={this.overrideWithProvisionedThroughputSettings() ? "" : this.props.maxAutoPilotThroughput?.toString()}
        onChange={this.onAutoPilotThroughputChange}
      />
      {!this.overrideWithProvisionedThroughputSettings() && this.getAutoPilotUsageCost()}
      {this.props.spendAckVisible && (
        <Checkbox
          id="spendAckCheckBox"
          styles={spendAckCheckBoxStyle}
          label={this.props.spendAckText}
          checked={this.state.spendAckChecked}
          onChange={this.onSpendAckChecked}
        />
      )}
    </>
  );

  private renderThroughputInput = (): JSX.Element => (
    <Stack {...titleAndInputStackProps}>
      <TextField
        required
        type="number"
        id="throughputInput"
        key="provisioned throughput input"
        styles={getTextFieldStyles(this.props.throughput, this.props.throughputBaseline)}
        disabled={this.overrideWithAutoPilotSettings()}
        step={this.step}
        min={this.props.minimum}
        max={this.props.canExceedMaximumValue ? undefined : this.props.maximum}
        value={
          this.overrideWithAutoPilotSettings()
            ? this.props.maxAutoPilotThroughputBaseline?.toString()
            : this.props.throughput?.toString()
        }
        onChange={this.onThroughputChange}
      />

      {this.props.getThroughputWarningMessage() && (
        <MessageBar messageBarType={MessageBarType.warning} styles={messageBarStyles}>
          {this.props.getThroughputWarningMessage()}
        </MessageBar>
      )}

      {!this.props.isEmulator && this.getRequestUnitsUsageCost()}

      {this.props.spendAckVisible && (
        <Checkbox
          id="spendAckCheckBox"
          styles={spendAckCheckBoxStyle}
          label={this.props.spendAckText}
          checked={this.state.spendAckChecked}
          onChange={this.onSpendAckChecked}
        />
      )}

      {this.props.isFixed && <p>Choose unlimited storage capacity for more than 10,000 RU/s.</p>}
    </Stack>
  );

  public render(): JSX.Element {
    return (
      <Stack {...checkBoxAndInputStackProps}>
        {!this.props.isFixed && this.renderThroughputModeChoices()}

        {this.props.isAutoPilotSelected ? this.renderAutoPilotInput() : this.renderThroughputInput()}
      </Stack>
    );
  }
}
