import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    icon: "file:random.svg",
    group: ["transform"],
    version: 1,
    description: "Generates random numbers",
    defaults: {
      name: "Random",
      color: "#9391ffff",
    },
    inputs: ["main"],
    outputs: ["main"],
    properties: [

      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        options: [
          {
            name: "True Random Number Generator",
            value: "trueRandomNumber",
          },
        ],
        default: "trueRandomNumber",
        noDataExpression: true,
      },
      {
        displayName: "Min:",
        name: "minNumber",
        type: "number",
        default: 1,
        required: true,
        description: "The minimun range value for the random generator",
      },
      {
        displayName: "Max:",
        name: "maxNumber",
        type: "number",
        default: 100,
        required: true,
        description: "The maximum range value for the random generator",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    return [this.helpers.returnJsonArray({})];
  }
}