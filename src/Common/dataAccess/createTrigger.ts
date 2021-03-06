import { Resource, TriggerDefinition } from "@azure/cosmos";
import { logConsoleError, logConsoleProgress } from "../../Utils/NotificationConsoleUtils";
import { client } from "../CosmosClient";
import { logError } from "../Logger";
import { sendNotificationForError } from "./sendNotificationForError";

export async function createTrigger(
  databaseId: string,
  collectionId: string,
  trigger: TriggerDefinition
): Promise<TriggerDefinition & Resource> {
  let createdTrigger: TriggerDefinition & Resource;
  const clearMessage = logConsoleProgress(`Creating trigger ${trigger.id}`);
  try {
    const response = await client()
      .database(databaseId)
      .container(collectionId)
      .scripts.triggers.create(trigger);
    createdTrigger = response.resource;
  } catch (error) {
    logConsoleError(`Error while creating trigger ${trigger.id}:\n ${JSON.stringify(error)}`);
    logError(JSON.stringify(error), "CreateTrigger", error.code);
    sendNotificationForError(error);
  }

  clearMessage();
  return createdTrigger;
}
