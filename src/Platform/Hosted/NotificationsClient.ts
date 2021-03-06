import { NotificationsClientBase } from "../../Common/NotificationsClientBase";

export class NotificationsClient extends NotificationsClientBase {
  private static readonly _notificationsApiSuffix: string = "/api/guest/notifications";

  public constructor() {
    super(NotificationsClient._notificationsApiSuffix);
  }
}
