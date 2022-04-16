import { ServiceBase } from "@/api/core";

export class SendMessageService extends ServiceBase {
  public static sendMessage(data: string | number): Promise<null> {
    const method = "POST";
    const url = "/api/form";

    return ServiceBase.callApi({
      method,
      url,
      data: { message: data },
    });
  }
}
