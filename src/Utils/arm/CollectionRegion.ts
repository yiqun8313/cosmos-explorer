/* 
  AUTOGENERATED FILE
  Do not manually edit
  Run "npm run generateARMClients" to regenerate
*/

import * as Types from "./types";

/* Retrieves the metrics determined by the given filter for the given database account, collection and region. */
export async function listMetrics(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  region: string,
  databaseRid: string,
  collectionRid: string
): Promise<Types.MetricListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/region/${region}/databases/${databaseRid}/collections/${collectionRid}/metrics`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}