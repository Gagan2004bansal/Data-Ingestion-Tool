# ClickHouse & CSV Ingestion Tool

A tool for seamless data transfer between CSV files and ClickHouse, featuring a **React frontend** and **FastAPI backend**.

---

## Overview

Bidirectional data flow made simple:

- **CSV → ClickHouse** : Upload a CSV, preview, select columns, and ingest. Column names are auto-sanitized (e.g., `table.col` → `table_col`).
- **ClickHouse → CSV** : Export any ClickHouse table to CSV.
- **Error Handling** : Malformed CSVs and invalid columns display user-friendly error messages.

---

## Tech Stack

- **Frontend** : React (`http://localhost:3000`)
- **Backend** : FastAPI
- **Database** : ClickHouse
- **Libraries** : `pandas`, `clickhouse-connect`

---

## Features

- Upload CSV and ingest into ClickHouse
- Export ClickHouse tables to CSV
- Auto-sanitization of column names
- Error validation and alerts
- User-friendly interface with data previews, column selection, and reset

---

##  Prerequisites

- **Python** : 3.8 or higher  
- **Node.js** : 16 or higher  
- **ClickHouse** : Running on `localhost:8123`  
  - Default user : `default`  
  - Password : `my_jwt_token` *(edit in `backend/config.py` if different)*  
- **Git**
- **Modern browser** (Chrome, Edge, etc.)

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/dixitaa13/ingestion-tool.git
cd ingestion-tool
```

### 2. Set Up the Backend

```bash 
cd backend
python -m venv venv

# Activate the virtual environment:
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install fastapi uvicorn pandas clickhouse-connect
uvicorn app.main:app --reload
```
Backend runs at: http://127.0.0.1:8000

### 3. Set Up the Frontend
Open a new terminal window :
```bash
cd frontend
npm install
npm start
```
Frontend runs at : http://localhost:3000

### 4. Verify ClickHouse
- Ensure ClickHouse is running locally (localhost:8123)
- Create sample tables (e.g., uk_price_paid) if needed for testing

---

## Usage
1. Launch UI: Open http://localhost:3000
2. Upload CSV: Preview → Select columns → Click “Ingest”
3. Export Table: Select ClickHouse table → Click “Export”
4. Error Alerts:
    - Invalid columns: “Columns not found”
    - Malformed CSVs: “Invalid CSV format”
5. Reset UI: Use “Reset” to clear all selections and previews

---

## Directory Structure

```bash
ingestion-tool/
├── backend/
│   └── app/
│       ├── main.py         # FastAPI app
│       └── config.py       # ClickHouse credentials
├── frontend/
│   └── src/
│       └── App.js          # React components
├── .gitignore              # Excludes venv, node_modules, CSVs
├── README.md               # Project documentation
```

---

### Challenges Solved
1. Fixed ClickHouse Code: 62 errors via column sanitization
2. Implemented a smooth UI reset flow
3. Added robust error messages for CSV issues
4. Resolved Git authentication issues for pushing

---