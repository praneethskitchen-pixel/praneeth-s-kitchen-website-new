/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderRecord } from "../types";

export const DEFAULT_WEBHOOK_KEY = "pk_cloud_webhook_url";

export function getWebhookUrl(): string {
  return localStorage.getItem(DEFAULT_WEBHOOK_KEY) || "";
}

export function setWebhookUrl(url: string): void {
  localStorage.setItem(DEFAULT_WEBHOOK_KEY, url.trim());
}

/**
 * Automatically dispatches new order records to the connected Cloud Webhook (Google Sheets / Power Automate / Make / Zapier)
 */
export async function syncOrderToCloud(order: OrderRecord): Promise<{ success: boolean; message: string }> {
  const webhookUrl = getWebhookUrl();

  if (!webhookUrl) {
    return { 
      success: false, 
      message: "No Webhook URL configured. Saved to local register only." 
    };
  }

  try {
    // Mode 'no-cors' allows sending data to Google Apps Script / Webhooks without CORS blocking
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
      mode: "no-cors"
    });

    return { 
      success: true, 
      message: "Order automatically synced to Cloud Spreadsheet Webhook!" 
    };
  } catch (err: any) {
    console.error("Cloud Webhook Sync Error:", err);
    return { 
      success: false, 
      message: `Sync failed: ${err?.message || "Network error"}` 
    };
  }
}

export const GOOGLE_APPS_SCRIPT_TEMPLATE = `// 1. Open your Google Sheet
// 2. Click Extensions > Apps Script
// 3. Replace all code with this snippet and click Save & Deploy > New Deployment (Type: Web app, Access: Anyone)
// 4. Copy the Web app URL into Praneeth's Kitchen Orders Settings!

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.id,
    data.type === 'catering' ? 'BULK CATERING' : 'DIRECT ORDER',
    data.timestamp,
    data.customerName,
    data.customerPhone,
    data.customerEmail || 'N/A',
    data.deliveryType,
    data.address,
    data.eventDate || 'N/A',
    data.itemsSummary,
    data.totalAmount,
    data.status
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
