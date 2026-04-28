export const monthlyData = [
  { month: 'Jan', budget: 500000, actual: 420000, waitingInvoice: 60000 },
  { month: 'Feb', budget: 500000, actual: 460000, waitingInvoice: 75000 },
  { month: 'Mar', budget: 500000, actual: 510000, waitingInvoice: 45000 },
  { month: 'Apr', budget: 500000, actual: 470000, waitingInvoice: 85000 },
  { month: 'May', budget: 500000, actual: 430000, waitingInvoice: 90000 },
  { month: 'Jun', budget: 500000, actual: 525000, waitingInvoice: 80000 },
  { month: 'Jul', budget: 500000, actual: 455000, waitingInvoice: 50000 },
  { month: 'Aug', budget: 500000, actual: 440000, waitingInvoice: 65000 },
  { month: 'Sep', budget: 500000, actual: 515000, waitingInvoice: 70000 },
  { month: 'Oct', budget: 500000, actual: 480000, waitingInvoice: 55000 },
  { month: 'Nov', budget: 500000, actual: 495000, waitingInvoice: 62000 },
  { month: 'Dec', budget: 500000, actual: 505000, waitingInvoice: 68000 },
];

export const workOrders = [
  { orderNo: '2201451', owner: 'Somchai', status: 'Closed', equipment: 'Compressor A1', functionalLocation: 'UTIL-COMP-01', cost: 85000, downtimeHours: 4, dueDate: '2026-01-15' },
  { orderNo: '2302120', owner: 'Anan', status: 'Closed', equipment: 'Boiler B2', functionalLocation: 'UTIL-BOIL-02', cost: 65000, downtimeHours: 1, dueDate: '2026-02-18' },
  { orderNo: '2403022', owner: 'Krit', status: 'In Progress', equipment: 'Conveyor C5', functionalLocation: 'PKG-CONV-05', cost: 73000, downtimeHours: 6, dueDate: '2026-03-08' },
  { orderNo: '2504199', owner: 'Nok', status: 'Open', equipment: 'Chiller CH3', functionalLocation: 'HVAC-CHIL-03', cost: 58000, downtimeHours: 3, dueDate: '2026-04-30' },
  { orderNo: '2605210', owner: 'Somchai', status: 'Closed', equipment: 'Mixer M2', functionalLocation: 'PRD-MIX-02', cost: 94000, downtimeHours: 7, dueDate: '2026-05-17' },
  { orderNo: '2106135', owner: 'Anan', status: 'Open', equipment: 'Hydraulic Press P1', functionalLocation: 'PRD-PRES-01', cost: 132000, downtimeHours: 9, dueDate: '2026-06-22' },
  { orderNo: '2707122', owner: 'Krit', status: 'In Progress', equipment: 'Packaging Line L3', functionalLocation: 'PKG-LINE-03', cost: 110000, downtimeHours: 5, dueDate: '2026-07-19' },
  { orderNo: '2208128', owner: 'Nok', status: 'Closed', equipment: 'Pump PU7', functionalLocation: 'UTIL-PUMP-07', cost: 47000, downtimeHours: 2, dueDate: '2026-08-12' },
  { orderNo: '2309211', owner: 'Somchai', status: 'Closed', equipment: 'Cooling Tower CT1', functionalLocation: 'UTIL-COOL-01', cost: 88000, downtimeHours: 1, dueDate: '2026-09-09' },
  { orderNo: '2410114', owner: 'Anan', status: 'Open', equipment: 'Valve Station VS4', functionalLocation: 'PRD-VALV-04', cost: 53000, downtimeHours: 3, dueDate: '2026-10-16' },
  { orderNo: '2511201', owner: 'Krit', status: 'In Progress', equipment: 'Robot Arm R6', functionalLocation: 'PRD-ROBO-06', cost: 146000, downtimeHours: 8, dueDate: '2026-11-23' },
  { orderNo: '2612188', owner: 'Nok', status: 'Closed', equipment: 'Generator G1', functionalLocation: 'UTIL-GEN-01', cost: 124000, downtimeHours: 2, dueDate: '2026-12-05' },
];

export const prpoData = [
  { prNo: 'PR-2601-001', poNo: 'PO-2601-034', orderNo: '2201451', owner: 'Somchai', vendor: 'Thai Industrial Service', poValue: 120000, stillToInvoice: 35000, expectedInvoiceMonth: 'Jan', status: 'Waiting Invoice' },
  { prNo: 'PR-2602-011', poNo: 'PO-2602-057', orderNo: '2302120', owner: 'Anan', vendor: 'Siam Boiler Tech', poValue: 95000, stillToInvoice: 0, expectedInvoiceMonth: 'Feb', status: 'Completed' },
  { prNo: 'PR-2603-009', poNo: 'PO-2603-080', orderNo: '2403022', owner: 'Krit', vendor: 'ConveyPro Co.,Ltd.', poValue: 145000, stillToInvoice: 48000, expectedInvoiceMonth: 'Mar', status: 'Partial Invoice' },
  { prNo: 'PR-2604-020', poNo: 'PO-2604-101', orderNo: '2504199', owner: 'Nok', vendor: 'Chiller Maintenance Group', poValue: 76000, stillToInvoice: 76000, expectedInvoiceMonth: 'Apr', status: 'Waiting Invoice' },
  { prNo: 'PR-2605-015', poNo: 'PO-2605-110', orderNo: '2605210', owner: 'Somchai', vendor: 'MixTech Engineering', poValue: 165000, stillToInvoice: 22000, expectedInvoiceMonth: 'May', status: 'Partial Invoice' },
  { prNo: 'PR-2606-004', poNo: 'PO-2606-140', orderNo: '2106135', owner: 'Anan', vendor: 'Hydraulic Experts', poValue: 210000, stillToInvoice: 90000, expectedInvoiceMonth: 'Jun', status: 'Waiting Approval' },
  { prNo: 'PR-2607-018', poNo: 'PO-2607-149', orderNo: '2707122', owner: 'Krit', vendor: 'Line Automation Asia', poValue: 188000, stillToInvoice: 65000, expectedInvoiceMonth: 'Jul', status: 'Partial Invoice' },
  { prNo: 'PR-2608-023', poNo: 'PO-2608-166', orderNo: '2208128', owner: 'Nok', vendor: 'Pump Master Thailand', poValue: 69000, stillToInvoice: 0, expectedInvoiceMonth: 'Aug', status: 'Completed' },
];

export const equipmentData = [
  { equipment: 'Compressor A1', functionalLocation: 'UTIL-COMP-01', mtbf: 320, mttr: 3.1, downtimeHours: 26, maintenanceCost: 420000 },
  { equipment: 'Boiler B2', functionalLocation: 'UTIL-BOIL-02', mtbf: 440, mttr: 2.2, downtimeHours: 18, maintenanceCost: 265000 },
  { equipment: 'Conveyor C5', functionalLocation: 'PKG-CONV-05', mtbf: 210, mttr: 4.4, downtimeHours: 43, maintenanceCost: 390000 },
  { equipment: 'Chiller CH3', functionalLocation: 'HVAC-CHIL-03', mtbf: 370, mttr: 3.5, downtimeHours: 31, maintenanceCost: 310000 },
  { equipment: 'Mixer M2', functionalLocation: 'PRD-MIX-02', mtbf: 280, mttr: 4.1, downtimeHours: 37, maintenanceCost: 510000 },
  { equipment: 'Hydraulic Press P1', functionalLocation: 'PRD-PRES-01', mtbf: 190, mttr: 5.6, downtimeHours: 58, maintenanceCost: 640000 },
  { equipment: 'Packaging Line L3', functionalLocation: 'PKG-LINE-03', mtbf: 240, mttr: 4.8, downtimeHours: 51, maintenanceCost: 550000 },
  { equipment: 'Pump PU7', functionalLocation: 'UTIL-PUMP-07', mtbf: 410, mttr: 2.1, downtimeHours: 16, maintenanceCost: 210000 },
  { equipment: 'Cooling Tower CT1', functionalLocation: 'UTIL-COOL-01', mtbf: 460, mttr: 1.9, downtimeHours: 14, maintenanceCost: 240000 },
  { equipment: 'Robot Arm R6', functionalLocation: 'PRD-ROBO-06', mtbf: 230, mttr: 4.9, downtimeHours: 47, maintenanceCost: 590000 },
];

export const filters = {
  owners: ['All', 'Somchai', 'Anan', 'Krit', 'Nok'],
  months: ['All', ...monthlyData.map((m) => m.month)],
  statuses: ['All', 'Open', 'Closed', 'In Progress', 'Waiting Invoice', 'Partial Invoice', 'Waiting Approval', 'Completed'],
};

export const orderTypeMap = {
  '22': 'CM',
  '23': 'PM',
  '24': 'CL',
  '25': 'SD',
  '26': 'IM',
  '21': 'BD',
  '27': 'PJ',
};
