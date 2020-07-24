/* 
  AUTOGENERATED FILE
  Do not manually edit
  Run "npm run generateARMClients" to regenerate
*/

import * as Types from "./types";

/* Retrieves the properties of an existing Azure Cosmos DB database account. */
export async function get(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.DatabaseAccountGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}

/* Updates the properties of an existing Azure Cosmos DB database account. */
export async function update(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  body: Types.DatabaseAccountUpdateParameters
): Promise<Types.DatabaseAccountGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}`;
  return window
    .fetch(this.baseUrl + path, { method: "patch", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Creates or updates an Azure Cosmos DB database account. The "Update" method is preferred when performing updates on an account. */
export async function createOrUpdate(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  body: Types.DatabaseAccountCreateUpdateParameters
): Promise<Types.DatabaseAccountGetResults> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}`;
  return window
    .fetch(this.baseUrl + path, { method: "put", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Deletes an existing Azure Cosmos DB database account. */
export async function destroy(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<void | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}`;
  return window.fetch(this.baseUrl + path, { method: "delete" }).then(response => response.json());
}

/* Changes the failover priority for the Azure Cosmos DB database account. A failover priority of 0 indicates a write region. The maximum value for a failover priority = (total number of regions - 1). Failover priority values must be unique for each of the regions in which the database account exists. */
export async function failoverPriorityChange(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  body: Types.FailoverPolicies
): Promise<void | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/failoverPriorityChange`;
  return window
    .fetch(this.baseUrl + path, { method: "post", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Lists all the Azure Cosmos DB database accounts available under the subscription. */
export async function list(subscriptionId: string): Promise<Types.DatabaseAccountsListResult> {
  const path = `/subscriptions/${subscriptionId}/providers/Microsoft.DocumentDB/databaseAccounts`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}

/* Lists all the Azure Cosmos DB database accounts available under the given resource group. */
export async function listByResourceGroup(
  subscriptionId: string,
  resourceGroupName: string
): Promise<Types.DatabaseAccountsListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}

/* Lists the access keys for the specified Azure Cosmos DB database account. */
export async function listKeys(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.DatabaseAccountListKeysResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/listKeys`;
  return window.fetch(this.baseUrl + path, { method: "post" }).then(response => response.json());
}

/* Lists the connection strings for the specified Azure Cosmos DB database account. */
export async function listConnectionStrings(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.DatabaseAccountListConnectionStringsResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/listConnectionStrings`;
  return window.fetch(this.baseUrl + path, { method: "post" }).then(response => response.json());
}

/* Offline the specified region for the specified Azure Cosmos DB database account. */
export async function offlineRegion(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  body: Types.RegionForOnlineOffline
): Promise<void | void | Types.ErrorResponse> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/offlineRegion`;
  return window
    .fetch(this.baseUrl + path, { method: "post", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Online the specified region for the specified Azure Cosmos DB database account. */
export async function onlineRegion(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  body: Types.RegionForOnlineOffline
): Promise<void | void | Types.ErrorResponse> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/onlineRegion`;
  return window
    .fetch(this.baseUrl + path, { method: "post", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Lists the read-only access keys for the specified Azure Cosmos DB database account. */
export async function getReadOnlyKeys(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.DatabaseAccountListReadOnlyKeysResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/readonlykeys`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}

/* Lists the read-only access keys for the specified Azure Cosmos DB database account. */
export async function listReadOnlyKeys(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.DatabaseAccountListReadOnlyKeysResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/readonlykeys`;
  return window.fetch(this.baseUrl + path, { method: "post" }).then(response => response.json());
}

/* Regenerates an access key for the specified Azure Cosmos DB database account. */
export async function regenerateKey(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string,
  body: Types.DatabaseAccountRegenerateKeyParameters
): Promise<void | void> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/regenerateKey`;
  return window
    .fetch(this.baseUrl + path, { method: "post", body: JSON.stringify(body) })
    .then(response => response.json());
}

/* Checks that the Azure Cosmos DB account name already exists. A valid account name may contain only lowercase letters, numbers, and the '-' character, and must be between 3 and 50 characters. */
export async function checkNameExists(accountName: string): Promise<void | void> {
  const path = `/providers/Microsoft.DocumentDB/databaseAccountNames/${accountName}`;
  return window.fetch(this.baseUrl + path, { method: "head" }).then(response => response.json());
}

/* Retrieves the metrics determined by the given filter for the given database account. */
export async function listMetrics(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.MetricListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/metrics`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}

/* Retrieves the usages (most recent data) for the given database account. */
export async function listUsages(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.UsagesResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/usages`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}

/* Retrieves metric definitions for the given database account. */
export async function listMetricDefinitions(
  subscriptionId: string,
  resourceGroupName: string,
  accountName: string
): Promise<Types.MetricDefinitionsListResult> {
  const path = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/${accountName}/metricDefinitions`;
  return window.fetch(this.baseUrl + path, { method: "get" }).then(response => response.json());
}
