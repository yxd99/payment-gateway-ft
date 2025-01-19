import { httpClient } from "@/infrastructure/http-client";
import { PaymentRepository } from "../application/ports/payment-repository";
import { PaymentAcceptanceApiTokenResponse } from "../application/ports/payment-acceptance-api-token-response";
import { PaymentApiForm } from "../application/ports/payment-api-form";
import { Payment } from "../core/payment";

export class PaymentHttpRepository implements PaymentRepository {
  private readonly baseUrl = "/payments";

  async fetchAcceptanceToken(): Promise<PaymentAcceptanceApiTokenResponse> {
    const data = await httpClient.get<PaymentAcceptanceApiTokenResponse>(`${this.baseUrl}/acceptance-token`);
    return data;
  }

  async submitPayment(data: PaymentApiForm): Promise<Payment> {
    const response = await httpClient.post<Payment>(this.baseUrl, data);
    return new Payment(
      response.id,
      response.product,
      response.amount,
      response.transactionId,
      response.createdAt,
      response.reference,
      response.customerEmail,
      response.status,
      response.statusMessage
    );
  }
}
