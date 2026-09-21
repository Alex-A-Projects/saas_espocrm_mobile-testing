export const extensionModules = [
  ['Document', 'Documents'], ['Product', 'Products'], ['Quote', 'Quotes'],
  ['SalesOrder', 'Sales Orders'], ['Invoice', 'Invoices'], ['DeliveryOrder', 'Delivery Orders'],
  ['ReturnOrder', 'Return Orders'], ['CreditNote', 'Credit Notes'], ['Supplier', 'Suppliers'],
  ['PurchaseOrder', 'Purchase Orders'], ['ReceiptOrder', 'Receipt Orders'],
  ['SupplierBill', 'Bills'], ['PaymentEntry', 'Payments'], ['Project', 'Projects'],
  ['ProjectTask', 'Project Tasks'], ['Report', 'Reports'],
] as const;

export const quickCreateEntities = [
  ['Account', 'Save'], ['Contact', 'Save'], ['Lead', 'Save'], ['Opportunity', 'Save'],
  ['Meeting', 'Save'], ['Call', 'Save'], ['Task', 'Save'], ['Case', 'Save'],
  ['Email', 'Send'], ['ProjectTask', 'Save'],
] as const;
