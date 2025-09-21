import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "",
    name: "",
    icon: "file:node.svg",
    group: ["transform"],
    version: 1,
    description: "",
    defaults: {
      name: "node",
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
            name: "",
            value: "",
          },
        ],
        default: "",
        noDataExpression: true,
      },
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    return [this.helpers.returnJsonArray(returnData)];
  }
}