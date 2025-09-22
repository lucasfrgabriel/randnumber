import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

import { getRandom } from "./RandomService";

// Configuração do nó Random para n8n

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

/*
 * Pega os parâmetros min e max inseridos no n8n,
 * chama a função getRandom e retorna o número aleatório para a saída do nó
*/
  
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

    const items = this.getInputData();
    const returnData = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const min = this.getNodeParameter('minNumber', i, 1) as number;
        const max = this.getNodeParameter('maxNumber', i, 100) as number;

        const randomNumber = await getRandom(min, max);

        returnData.push({
          json: { randomNumber: randomNumber },
        });

      } catch (error) {
          if (this.continueOnFail()) {
            returnData.push({ json: { error: (error as Error).message } });
            continue;
          }
          throw error;
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}