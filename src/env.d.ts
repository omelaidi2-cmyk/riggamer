/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        MEDIA: R2Bucket;
        ASSETS: Fetcher;
        GTM_ID: string;
      };
    };
  }
}
