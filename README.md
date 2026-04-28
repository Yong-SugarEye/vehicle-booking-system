# Maintenance Dashboard Template (React + Vite)

Responsive maintenance management dashboard template for maintenance engineers. This version uses mock factory-like data and is ready for future Excel/Google Sheets integration.

## Features

- Overview KPI cards (budget, actual, waiting invoice, remaining budget)
- Cost dashboard with monthly charts, owner/equipment top cost, cost category map
- Work order dashboard (status, PM compliance, CM vs PM, breakdown jobs)
- PR/PO tracking table with filter and search
- Equipment dashboard with MTBF/MTTR, downtime, and maintenance cost views
- Modern industrial style with color conventions:
  - Green = good/completed
  - Yellow = warning/waiting invoice
  - Red = over budget/breakdown
  - Blue = planned/normal

## Setup

1. Install dependencies

```bash
npm install
```

2. Start local development server

```bash
npm run dev
```

3. Open the local URL shown in terminal (typically `http://localhost:5173`)

## Future data integration

You can later connect this template to:

- Excel files (through parser like `xlsx` and upload flow)
- Google Sheets API (fetch rows and map to existing structures in `src/data/mockData.js`)
- Existing CMMS exports by transforming to the same fields used in current mock datasets
