import { shallow } from "enzyme";
import React from "react";
import {
  ThroughputInputAutoPilotV3Component,
  ThroughputInputAutoPilotV3Props
} from "./ThroughputInputAutoPilotV3Component";

describe("ThroughputInputAutoPilotV3Component", () => {
  const baseProps: ThroughputInputAutoPilotV3Props = {
    throughput: 100,
    throughputBaseline: 100,
    onThroughputChange: undefined,
    minimum: 10000,
    maximum: 400,
    step: 100,
    isEnabled: true,
    isEmulator: false,
    requestUnitsUsageCost: undefined,
    spendAckChecked: false,
    spendAckId: "spendAckId",
    spendAckText: "spendAckText",
    spendAckVisible: false,
    showAsMandatory: true,
    isFixed: true,
    label: "label",
    infoBubbleText: "infoBubbleText",
    canExceedMaximumValue: true,
    onAutoPilotSelected: undefined,
    isAutoPilotSelected: false,
    autoPilotUsageCost: undefined,
    showAutoPilot: true,
    overrideWithAutoPilotSettings: true,
    overrideWithProvisionedThroughputSettings: false,
    maxAutoPilotThroughput: 4000,
    maxAutoPilotThroughputBaseline: 4000,
    onMaxAutoPilotThroughputChange: undefined,
    hasProvisioningTypeChanged: () => false,
    onScaleSaveableChange: (isScaleSaveable: boolean) => {
      return;
    },
    onScaleDiscardableChange: (isScaleDiscardable: boolean) => {
      return;
    },
    getWarningMessage: () => undefined  
  };

  it("throughput input visible", () => {
    const wrapper = shallow(<ThroughputInputAutoPilotV3Component {...baseProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists("#throughputInput")).toEqual(true);
    expect(wrapper.exists("#autopilotInput")).toEqual(false);
  });

  it("autopilot input visible", () => {
    const newProps = { ...baseProps, isAutoPilotSelected: true };
    const wrapper = shallow(<ThroughputInputAutoPilotV3Component {...newProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists("#autopilotInput")).toEqual(true);
    expect(wrapper.exists("#throughputInput")).toEqual(false);
  });

  it("spendAck checkbox visible", () => {
    const newProps = { ...baseProps, spendAckVisible: true };
    const wrapper = shallow(<ThroughputInputAutoPilotV3Component {...newProps} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.exists("#spendAckCheckBox")).toEqual(true);
  });
});
