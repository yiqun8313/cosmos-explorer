import { shallow } from "enzyme";
import React from "react";
import {
  getAutoPilotV3SpendElement,
  getEstimatedSpendElement,
  getEstimatedAutoscaleSpendElement,
  manualToAutoscaleDisclaimerElement,
  ttlWarning,
  indexingPolicyTTLWarningMessage,
  updateThroughputBeyondLimitWarningMessage,
  updateThroughputDelayedApplyWarningMessage,
  getThroughputApplyDelayedMessage,
  getThroughputApplyShortDelayMessage,
  getThroughputApplyLongDelayMessage,
  getToolTipContainer,
  conflictResolutionCustomToolTip,
  changeFeedPolicyToolTip,
  conflictResolutionLwwTooltip
} from "./SettingsRenderUtils";

class SettingsRenderUtilsTestComponent extends React.Component {
  public render(): JSX.Element {
    return (
      <>
        {getAutoPilotV3SpendElement(1000, false)}
        {getAutoPilotV3SpendElement(undefined, false)}
        {getAutoPilotV3SpendElement(1000, true)}
        {getAutoPilotV3SpendElement(undefined, true)}

        {getEstimatedSpendElement(1000, "mooncake", 2, false, true)}

        {getEstimatedAutoscaleSpendElement(1000, "mooncake", 2, false)}

        {manualToAutoscaleDisclaimerElement}
        {ttlWarning}
        {indexingPolicyTTLWarningMessage}
        {updateThroughputBeyondLimitWarningMessage}
        {updateThroughputDelayedApplyWarningMessage}

        {getThroughputApplyDelayedMessage(false, 1000, "RU/s", "sampleDb", "sampleCollection", 2000)}
        {getThroughputApplyShortDelayMessage(false, 1000, "RU/s", "sampleDb", "sampleCollection", 2000)}
        {getThroughputApplyLongDelayMessage(false, 1000, "RU/s", "sampleDb", "sampleCollection", 2000)}

        {getToolTipContainer(<span>Sample Text</span>)}
        {conflictResolutionLwwTooltip}
        {conflictResolutionCustomToolTip}
        {changeFeedPolicyToolTip}
      </>
    );
  }
}

describe("SettingsUtils functions", () => {
  it("render", () => {
    const wrapper = shallow(<SettingsRenderUtilsTestComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
