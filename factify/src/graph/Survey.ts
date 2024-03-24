export interface SurveyJSQuestion {
    type: string;
    name: string;
    title: string;
    isRequired?: boolean;
    choices?: { value: string; text: string }[];
}

export interface SurveyJSPage {
    elements: SurveyJSQuestion[];
}

export interface SurveyJSObject {
    pages: SurveyJSPage[];
}

export interface JSONSchemaProperty {
    type: string;
    items?: JSONSchemaProperty;
    enum?: string[];
}

export interface JSONSchema {
    $schema: string;
    type: string;
    properties: { [key: string]: JSONSchemaProperty };
    required: string[];
}

export function inferJSONSchema(surveyObject: SurveyJSObject): JSONSchema {
    const jsonSchema: JSONSchema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {},
        required: [],
    };

    const questions: SurveyJSQuestion[] = surveyObject.pages[0].elements;
    for (const question of questions) {
        const { name, type } = question;
        if (!name) {
            continue;
        }

        const jsonProperty: JSONSchemaProperty = {
            type: "string", // Default type
        };

        if (type === "text") {
            jsonProperty.type = "string";
        } else if (type === "checkbox") {
            jsonProperty.type = "array";
            jsonProperty.items = {
                type: "string",
            };
        } else if (type === "radiogroup") {
            jsonProperty.type = "string";
            const choices = question.choices;
            if (choices) {
                jsonProperty.enum = choices.map((choice) => choice.value);
            }
        }
        // Add more question types as needed

        jsonSchema.properties[name] = jsonProperty;
        if (question.isRequired) {
            jsonSchema.required.push(name);
        }
    }

    return jsonSchema;
}
