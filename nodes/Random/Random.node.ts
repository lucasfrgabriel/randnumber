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

    const items = this.getInputData();
    let responseData;
    const returnData = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const min = this.getNodeParameter('minNumber', i, 1) as number;
        const max = this.getNodeParameter('maxNumber', i, 100) as number;

        const randomOrgUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
		
        const fetch = (globalThis as any).fetch || require('node-fetch');
        const res = await fetch(randomOrgUrl);

        if(!res.ok) {
          throw new Error(`Error fetching random number: ${res.statusText}`);
        }

		    responseData = await res.text();

        const randomNumber = parseInt(responseData.trim(), 10);

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