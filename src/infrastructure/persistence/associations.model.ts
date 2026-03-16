import DocumentsType from "./models/DocumentsType.model";
import Headquarters from "./models/Headquarters.model";
import Peoples from "./models/Peoples.model";
import Roles from "./models/Roles.model";
import Students from "./models/Students.model";
import Users from "./models/Users.model";

const defineAssociations = () => {
  // Students
  DocumentsType.hasMany(Students, { foreignKey: "idDocumentsType" });
  Headquarters.hasMany(Students, { foreignKey: "idHeadquarter" });
  Students.belongsTo(DocumentsType, {
    foreignKey: "idDocumentsType",
    as: "documentType",
  });
  Students.belongsTo(Headquarters, {
    foreignKey: "idHeadquarter",
    as: "headquarter",
  });

  // People
  DocumentsType.hasMany(Peoples, { foreignKey: "idDocumentsType" });
  Peoples.belongsTo(DocumentsType, {
    foreignKey: "idDocumentsType",
    as: "documentType",
  });

  // User
  Peoples.hasMany(Users, { foreignKey: "idPeople" });
  Roles.hasMany(Users, { foreignKey: "idRole" });
  Users.belongsTo(Roles, { foreignKey: "idRole", as: "role" });
  Users.belongsTo(Peoples, { foreignKey: "idPeople", as: "people" });

  // Subservicios
  // Services.hasMany(Subservices, { foreignKey: "idService" });
  // Subservices.belongsTo(Services, { foreignKey: "idService", as: "services" });

  // // SpecificService
  // Subservices.hasMany(SpecificService, { foreignKey: "idSubservice" });
  // SpecificService.belongsTo(Subservices, {
  //   foreignKey: "idSubservice",
  //   as: "subservice",
  // });

  // Asociación entre Payments y PaymentDetails
  // PaymentDetails.hasMany(Payments, { foreignKey: "idPaymentDetails" });
  // Payments.belongsTo(PaymentDetails, {
  //   foreignKey: "idPaymentDetails",
  //   as: "paymentDetails",
  // });

  // Asociación entre PaymentDetails y SpecificService
  // SpecificService.hasMany(PaymentDetails, { foreignKey: "idSpecificService" });
  // PaymentDetails.belongsTo(SpecificService, {
  //   foreignKey: "idSpecificService",
  //   as: "specificService",
  // });

  // Payment
  // Students.hasMany(Payments, { foreignKey: "idStudent" });
  // TypePayment.hasMany(Payments, { foreignKey: "idPaymentType" });
  // PaymentStatus.hasMany(Payments, { foreignKey: "idPaymentStatus" });
  // Payments.belongsTo(Students, {
  //   foreignKey: "idStudent",
  //   as: "students",
  // });
  // Payments.belongsTo(TypePayment, {
  //   foreignKey: "idPaymentType",
  //   as: "typePayment",
  // });
  // Payments.belongsTo(PaymentStatus, {
  //   foreignKey: "idPaymentStatus",
  //   as: "paymentStatus",
  // });
};

export default defineAssociations;
