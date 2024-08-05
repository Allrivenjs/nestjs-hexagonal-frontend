import {TransactionRepository} from "../domain/ports/outbound/TransactionRepository.ts";
import {TransactionService} from "../domain/ports/inbound/TransactionService.ts";
import {TransactionEntity} from "../domain/entity/transaction.entity.ts";

export const createTransactionService = (transactionRepository: TransactionRepository): TransactionService => {
    return {
        createTransaction(transaction: TransactionEntity): Promise<number> {
            return transactionRepository.createTransaction(transaction);
        },
        getTransaction(transactionId: number): Promise<TransactionEntity> {
            return transactionRepository.getTransaction(transactionId);
        }
    }
}