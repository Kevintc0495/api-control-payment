import * as awilix from "awilix";
import db from "../persistence/database";
import { BankController } from "@/presentation/controllers/bank.controller";
import { BankRepository } from "../repositories/bank.repository";
import { BankUseCase } from "@/application/useCases/bank.usecase";
import { DocumentTypeRepository } from "../repositories/documentType.repository";
import { DocumentTypeUseCase } from "@/application/useCases/documentType.usecase";
import { DocumentTypeController } from "@/presentation/controllers/documentType.controller";
import { AccountService } from "../services/account.service";
import { AccountController } from "@/presentation/controllers/account.controller";
import { NodeMailerService } from "../services/nodemailer.service";
import { EmailUtil } from "./email.util";
import { HeadquarterRepository } from "../repositories/headquarter.repository";
import { HeadquarterUseCase } from "@/application/useCases/headquarter.usecase";
import { HeadquarterController } from "@/presentation/controllers/Headquarter.controller";
import { PaymentStatusRepository } from "../repositories/paymentStatus.repository";
import { PaymentStatusUseCase } from "@/application/useCases/paymentStatus.usecase";
import { PaymentStatusController } from "@/presentation/controllers/paymentStatus.controller";
import { PaymentTypeRepository } from "../repositories/paymentType.repository";
import { PaymentTypeUseCase } from "@/application/useCases/paymentType.usecase";
import { PaymentTypeController } from "@/presentation/controllers/paymentType.controller";
import { RoleRepository } from "../repositories/role.repository";
import { RoleUseCase } from "@/application/useCases/role.usecase";
import { RoleController } from "@/presentation/controllers/role.controller";
import { StudentRepository } from "../repositories/student.repository";
import { StudentUseCase } from "@/application/useCases/student.usecase";
import { StudentController } from "@/presentation/controllers/student.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserUseCase } from "@/application/useCases/user.usecase";
import { UserController } from "@/presentation/controllers/user.controller";
import { PaymentRepository } from "../repositories/payment.repository";
import { PaymentUseCase } from "@/application/useCases/payment.usecase";
import { PaymentController } from "@/presentation/controllers/payment.controller";

const container = awilix.createContainer();

container.register({
  database: awilix.asValue(db),
  emailUtil: awilix.asClass(EmailUtil),

  accountService: awilix.asClass(AccountService),
  emailService: awilix.asClass(NodeMailerService),

  bankRepository: awilix.asClass(BankRepository),
  documentTypeRepository: awilix.asClass(DocumentTypeRepository),
  headquarterRepository: awilix.asClass(HeadquarterRepository),
  paymentStatusRepository: awilix.asClass(PaymentStatusRepository),
  paymentTypeRepository: awilix.asClass(PaymentTypeRepository),
  roleRepository: awilix.asClass(RoleRepository),
  studentRepository: awilix.asClass(StudentRepository),
  userRepository: awilix.asClass(UserRepository),
  paymentRepository: awilix.asClass(PaymentRepository),

  bankUseCase: awilix.asClass(BankUseCase),
  documentTypeUseCase: awilix.asClass(DocumentTypeUseCase),
  headquarterUseCase: awilix.asClass(HeadquarterUseCase),
  paymentStatusUseCase: awilix.asClass(PaymentStatusUseCase),
  paymentTypeUseCase: awilix.asClass(PaymentTypeUseCase),
  roleUseCase: awilix.asClass(RoleUseCase),
  studentUseCase: awilix.asClass(StudentUseCase),
  userUseCase: awilix.asClass(UserUseCase),
  paymentUseCase: awilix.asClass(PaymentUseCase),

  bankController: awilix.asClass(BankController),
  documentTypeController: awilix.asClass(DocumentTypeController),
  accountController: awilix.asClass(AccountController),
  headquarterController: awilix.asClass(HeadquarterController),
  paymentStatusController: awilix.asClass(PaymentStatusController),
  paymentTypeController: awilix.asClass(PaymentTypeController),
  roleController: awilix.asClass(RoleController),
  studentController: awilix.asClass(StudentController),
  userController: awilix.asClass(UserController),
  paymentController: awilix.asClass(PaymentController),
});

export const bankController = container.resolve("bankController");
export const documentTypeController = container.resolve(
  "documentTypeController",
);
export const accountController = container.resolve("accountController");
export const headquarterController = container.resolve("headquarterController");
export const paymentStatusController = container.resolve(
  "paymentStatusController",
);
export const paymentTypeController = container.resolve("paymentTypeController");
export const roleController = container.resolve("roleController");
export const studentController = container.resolve("studentController");
export const userController = container.resolve("userController");
export const paymentController = container.resolve("paymentController");
