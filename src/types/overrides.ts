import type { Override } from "./types";

const overrides: Override[] = [
  [
    /.+/,
    {
      admin_graphql_api_id: "gid://shopify/Something/1234567890",
      admin_graphql_api_job_id: "gid://shopify/Job/1234567890",
      created_at: "2021-12-30T19:00:00-05:00",
      updated_at: "2021-12-30T19:00:00-05:00",
      address2: "Apt 123",
      latitude: 10.1,
      longitude: 10.1,
      location_id: 111111,
    },
  ] as unknown as Override,
  [
    /bulk_operations\/.+/,
    {
      error_code: "SOME_ERROR_ENUM",
    },
  ] as unknown as Override,
  [
    /carts\/.+/,
    {
      note: "some cart note string",
    },
  ] as unknown as Override,
];
