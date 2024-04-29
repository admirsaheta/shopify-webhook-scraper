import got from "got";
import cheerio from "cheerio";

export interface DataFetcher {
  fetch(url: string): Promise<any>;
}

export class WebpageDataFetcher implements DataFetcher {
  async fetch(url: string) {
    const response = await got(url);
    const $ = cheerio.load(response.body);
    const scriptTag = $("script")
      .toArray()
      .find((script) => $(script).html()?.includes("window.RailsData"));
    if (!scriptTag) {
      throw new Error(
        "Expected to find window.RailsData script tag in Shopify source but couldn't"
      );
    }
    const scriptText = $(scriptTag).html()!;
    const jsonMatch = scriptText.match(
      /window\.RailsData = (\{[\s\S]*?\}\s*)\/\/\]\]/m
    );
    if (!jsonMatch) {
      throw new Error(
        "RailsData object literal not found in script tag or is in an unexpected format"
      );
    }
    return JSON.parse(jsonMatch[1]);
  }
}
