export const currentUser = {
  id: 1,
  name: "Admin User",
  role: "admin",
  email: "admin@nexgile.com",
  avatar: "AU",
};

export const users = [
  { id: 1, name: "Admin User", role: "admin", email: "admin@nexgile.com" },
  { id: 2, name: "Jane Smith", role: "customer", email: "jane@customer.com" },
  { id: 3, name: "Bob Johnson", role: "quality", email: "bob@nexgile.com" },
];

export const programs = [
  {
    id: "PRG-001",
    name: "Aerospace Bracket Assembly",
    customer: "AeroTech Inc.",
    site: "Hyderabad Plant",
    status: "Green",
    health: 92,
    owner: "Ravi Kumar",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    phase: "Production",
    milestones: [
      { name: "Design Review", date: "2024-02-01", status: "Completed" },
      { name: "Prototype", date: "2024-04-15", status: "Completed" },
      { name: "Qualification", date: "2024-07-01", status: "Completed" },
      { name: "Mass Production", date: "2024-09-01", status: "In Progress" },
      { name: "Delivery", date: "2024-12-31", status: "Pending" },
    ],
  },
  {
    id: "PRG-002",
    name: "EV Battery Module NPI",
    customer: "GreenDrive Motors",
    site: "Pune Facility",
    status: "Yellow",
    health: 67,
    owner: "Priya Sharma",
    startDate: "2024-03-01",
    endDate: "2025-03-31",
    phase: "NPI",
    milestones: [
      { name: "Requirements", date: "2024-03-15", status: "Completed" },
      { name: "Design Freeze", date: "2024-06-01", status: "Delayed" },
      { name: "Prototype Build", date: "2024-09-01", status: "In Progress" },
      { name: "Testing", date: "2025-01-01", status: "Pending" },
    ],
  },
  {
    id: "PRG-003",
    name: "Medical Device PCB",
    customer: "MedTech Solutions",
    site: "Chennai Hub",
    status: "Red",
    health: 38,
    owner: "Anil Mehta",
    startDate: "2024-05-01",
    endDate: "2024-11-30",
    phase: "R&D",
    milestones: [
      { name: "Concept Review", date: "2024-05-20", status: "Completed" },
      { name: "FDA Pre-Sub", date: "2024-07-01", status: "Delayed" },
      { name: "Prototype", date: "2024-09-15", status: "At Risk" },
      { name: "Clinical", date: "2024-11-01", status: "Pending" },
    ],
  },
  {
    id: "PRG-004",
    name: "Industrial Servo Controller",
    customer: "AutomateX",
    site: "Hyderabad Plant",
    status: "Green",
    health: 88,
    owner: "Deepa Nair",
    startDate: "2024-02-01",
    endDate: "2025-01-31",
    phase: "Production",
    milestones: [
      { name: "Design Approval", date: "2024-03-01", status: "Completed" },
      { name: "Line Setup", date: "2024-05-01", status: "Completed" },
      { name: "FAI", date: "2024-07-15", status: "Completed" },
      { name: "Volume Ramp", date: "2024-10-01", status: "In Progress" },
    ],
  },
];

export const workOrders = [
  { id: "WO-1001", program: "PRG-001", stage: "Assembly", line: "Line A", shift: "Morning", wip: 45, output: 120, yield: 97.5, rework: 3, status: "Running" },
  { id: "WO-1002", program: "PRG-002", stage: "Testing", line: "Line B", shift: "Afternoon", wip: 20, output: 60, yield: 92.1, rework: 8, status: "Running" },
  { id: "WO-1003", program: "PRG-003", stage: "Inspection", line: "Line C", shift: "Night", wip: 10, output: 30, yield: 85.0, rework: 12, status: "Hold" },
  { id: "WO-1004", program: "PRG-004", stage: "Packaging", line: "Line A", shift: "Morning", wip: 80, output: 200, yield: 99.1, rework: 1, status: "Running" },
  { id: "WO-1005", program: "PRG-001", stage: "Final QC", line: "Line D", shift: "Afternoon", wip: 15, output: 90, yield: 96.8, rework: 4, status: "Running" },
];

export const qualityEvents = [
  { id: "NCR-001", type: "NCR", program: "PRG-003", description: "Solder bridging on PCB layer 3", severity: "Major", status: "Open", date: "2024-10-15", assignee: "Anil Mehta" },
  { id: "NCR-002", type: "NCR", program: "PRG-002", description: "Dimensional deviation on bracket", severity: "Minor", status: "Under Review", date: "2024-10-18", assignee: "Priya Sharma" },
  { id: "CAP-001", type: "CAPA", program: "PRG-003", description: "Process control improvement for solder", severity: "Major", status: "In Progress", date: "2024-10-16", assignee: "Ravi Kumar" },
  { id: "AUD-001", type: "Audit", program: "PRG-001", description: "ISO 9001 Annual Audit", severity: "Info", status: "Scheduled", date: "2024-11-01", assignee: "Deepa Nair" },
  { id: "CAP-002", type: "CAPA", program: "PRG-002", description: "Tooling calibration schedule update", severity: "Minor", status: "Closed", date: "2024-09-30", assignee: "Bob Johnson" },
];

export const shipments = [
  { id: "SHP-2001", program: "PRG-001", customer: "AeroTech Inc.", items: 500, status: "In Transit", eta: "2024-11-05", carrier: "DHL", trackingNo: "DHL9876543210" },
  { id: "SHP-2002", program: "PRG-004", customer: "AutomateX", items: 200, status: "Delivered", eta: "2024-10-28", carrier: "FedEx", trackingNo: "FX1234567890" },
  { id: "SHP-2003", program: "PRG-002", customer: "GreenDrive Motors", items: 50, status: "Preparing", eta: "2024-11-15", carrier: "UPS", trackingNo: "UPS9988776655" },
  { id: "SHP-2004", program: "PRG-003", customer: "MedTech Solutions", items: 25, status: "On Hold", eta: "2024-12-01", carrier: "BlueDart", trackingNo: "BD1122334455" },
];

export const inventory = [
  { id: "INV-001", item: "Aerospace Bracket - Raw", sku: "AB-RAW-001", stock: 1200, allocated: 500, available: 700, minThreshold: 200, location: "Rack A-12" },
  { id: "INV-002", item: "EV Battery Cell", sku: "EV-CELL-002", stock: 300, allocated: 280, available: 20, minThreshold: 100, location: "Cold Storage B" },
  { id: "INV-003", item: "PCB Substrate", sku: "PCB-SUB-003", stock: 80, allocated: 75, available: 5, minThreshold: 50, location: "Rack C-05" },
  { id: "INV-004", item: "Servo Driver IC", sku: "SD-IC-004", stock: 2000, allocated: 800, available: 1200, minThreshold: 300, location: "Rack B-08" },
  { id: "INV-005", item: "Connector Housing", sku: "CON-HSG-005", stock: 5000, allocated: 1500, available: 3500, minThreshold: 500, location: "Rack A-03" },
];

export const purchaseOrders = [
  { id: "PO-3001", supplier: "AlphaMetals", item: "Aerospace Bracket - Raw", qty: 2000, status: "In Transit", leadTime: "15 days", eta: "2024-11-10", amount: 85000 },
  { id: "PO-3002", supplier: "BatteryPro", item: "EV Battery Cell", qty: 500, status: "Confirmed", leadTime: "30 days", eta: "2024-11-25", amount: 250000 },
  { id: "PO-3003", supplier: "CircuitWorld", item: "PCB Substrate", qty: 500, status: "Pending", leadTime: "20 days", eta: "2024-12-01", amount: 45000 },
  { id: "PO-3004", supplier: "SemTech Ltd", item: "Servo Driver IC", qty: 5000, status: "Delivered", leadTime: "10 days", eta: "2024-10-20", amount: 120000 },
];

export const rmaRecords = [
  { id: "RMA-001", customer: "AeroTech Inc.", program: "PRG-001", reason: "Dimensional tolerance failure", status: "Under Repair", receivedDate: "2024-10-10", qty: 12 },
  { id: "RMA-002", customer: "AutomateX", program: "PRG-004", reason: "Firmware issue reported", status: "Diagnosed", receivedDate: "2024-10-22", qty: 3 },
  { id: "RMA-003", customer: "MedTech Solutions", program: "PRG-003", reason: "Component failure in field", status: "Warranty Claim", receivedDate: "2024-10-25", qty: 5 },
];

export const documents = [
  { id: "DOC-001", name: "Aerospace Bracket BOM v3.2", type: "BOM", program: "PRG-001", version: "3.2", status: "Released", date: "2024-09-01" },
  { id: "DOC-002", name: "EV Module ECO-2024-045", type: "ECO/ECR", program: "PRG-002", version: "1.0", status: "Under Review", date: "2024-10-05" },
  { id: "DOC-003", name: "PCB Test Plan Rev B", type: "Test Plan", program: "PRG-003", version: "B", status: "Draft", date: "2024-10-15" },
  { id: "DOC-004", name: "Servo Controller IATF Cert Pack", type: "Certification", program: "PRG-004", version: "2.1", status: "Released", date: "2024-08-20" },
  { id: "DOC-005", name: "FDA Compliance Package - Medical", type: "Compliance", program: "PRG-003", version: "1.0", status: "Pending", date: "2024-10-20" },
];

export const kpis = {
  onTimeDelivery: 87.3,
  qualityYield: 94.2,
  capacityUtilization: 78.5,
  openNCRs: 2,
  activePOs: 3,
  pendingShipments: 2,
  totalPrograms: 4,
  greenPrograms: 2,
  yellowPrograms: 1,
  redPrograms: 1,
};

export const notifications = [
  { id: 1, type: "alert", message: "NCR-001 requires immediate attention - Major defect on PRG-003", time: "2 hours ago", read: false },
  { id: 2, type: "warning", message: "Inventory LOW: EV Battery Cell below threshold (20 units available)", time: "4 hours ago", read: false },
  { id: 3, type: "info", message: "SHP-2001 is In Transit - ETA Nov 5", time: "6 hours ago", read: true },
  { id: 4, type: "warning", message: "PRG-002 milestone 'Design Freeze' is delayed", time: "1 day ago", read: true },
  { id: 5, type: "info", message: "ISO 9001 Audit scheduled for Nov 1 - AUD-001", time: "2 days ago", read: true },
];
