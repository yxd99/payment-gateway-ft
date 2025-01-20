import { PaymentRepository } from "@features/checkout/application/ports/payment-repository";
import { Payment } from "@features/checkout/core/payment";
import { PaymentApiForm } from "@features/checkout/application/ports/payment-api-form";

export class SubmitPayment {
  constructor(private readonly repository: PaymentRepository) {}

  async execute(data: PaymentApiForm): Promise<Payment> {
    return this.repository.submitPayment(data);
  }
}