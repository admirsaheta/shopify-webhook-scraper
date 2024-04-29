import { inferSchema } from "@jsonhero/schema-infer";

export interface SchemaInferrer {
  infer(
    examplePayload: Record<string, any>,
    metadata: { name: string }
  ): Record<string, any>;
}

export class ExamplePayloadSchemaInferrer implements SchemaInferrer {
  infer(examplePayload: Record<string, any>, metadata: { name: string }): any {
    const inference = inferSchema(examplePayload);

    const overrides = getOverridesForWebhook(metadata.name);
    applyOverrides(inference, overrides);

    return inference.toJSONSchema();
  }
}

const overrides: [RegExp, Record<string, any>][] = [
  [
    /.+/,
    {
      admin_graphql_api_id: "gid://shopify/Something/1234567890",
      admin_graphql_api_job_id: "gid://shopify/Job/1234567890",
      created_at: "2021-12-30T19:00:00-05:00",
      updated_at: "2021-12-30T19:00:00-05:00",
    },
  ],

  [
    /^order\//,
    {
      gateway: "shopify_payments",
      completed_at: "2021-12-30T19:00:00-05:00",
    },
  ],

  [
    /^customer\//,
    {
      last_order_id: 12345,
      multipass_identifier: "some_multipass_identifier",
    },
  ],
];

// Function to retrieve overrides for a given webhook name
function getOverridesForWebhook(
  webhookName: string
): Record<string, any> | undefined {
  for (const [matcher, override] of overrides) {
    if (matcher.test(webhookName)) {
      return override;
    }
  }
  return undefined;
}

// Function to apply overrides to the schema
function applyOverrides(
  schema: Record<string, any>,
  overrides: Record<string, any> | undefined
) {
  if (!overrides) return;

  for (const [key, value] of Object.entries(overrides)) {
    schema.properties[key] = value;
  }
}
