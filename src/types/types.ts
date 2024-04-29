export interface WebhookMetadata {
  name: string;
  response: Record<string, any>;
}

export interface JsonSchema {
  $schema: string;
  properties: Record<string, any>;
}

export interface Override {
  matcher: RegExp;
  override: Record<string, any>;
}
