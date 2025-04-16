import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import ConnectionForm from './components/ConnectionForm';
import TableSelector from './components/TableSelector';
import ColumnSelector from './components/ColumnSelector';
import IngestionControl from './components/IngestionControl';
import './App.css';

function App() {
    const [source, setSource] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [tables, setTables] = useState([]);
    const [columns, setColumns] = useState([]);
    const [fileColumns, setFileColumns] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filePath, setFilePath] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);

    const resetState = () => {
        setTables([]);
        setColumns([]);
        setFileColumns([]);
        setSelectedColumns([]);
        setFilePath(null);
    };

    const handleConnect = (newSource) => {
        console.log('Connecting to source:', newSource);
        resetState();
        setSource(newSource);
        setIsConnected(!!newSource);
    };

    const handleSelectTable = (selectedTables) => {
        console.log('Tables selected:', selectedTables);
        setTables(selectedTables);
        setColumns([]);
        setSelectedColumns([]);
    };

    const handleSelectColumns = (selectedCols) => {
        console.log('Columns selected:', selectedCols);
        setSelectedColumns(selectedCols);
    };

    const handleFileColumns = (columns, file) => {
        console.log('Setting fileColumns:', columns, 'file:', file);
        resetState();
        setFileColumns(columns);
        setSelectedColumns([]);
        setFilePath(file);
        setSource('flatfile');
        setIsConnected(true);
    };

    const handleReset = () => {
        console.log('Resetting UI');
        resetState();
        setSource('');
        setIsConnected(false);
    };

    return (
        <Container fluid className="py-4 bg-black" style={{ minHeight: '100vh' }}>
            <h2 className="mb-4 text-white text-center font-extrabold">Data Ingestion Tool</h2>
            <Row className="justify-content-center border-2">
            <Col md={6} className='overflow-y-scroll'>
                    <Card className="card mb-4">
                        <Card.Body>
                            <h2 className="mb-4">How to Use This Tool</h2>
                            <div className="instruction-container">
                                <Accordion defaultActiveKey={`${currentStep}`}>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header className={currentStep === 1 ? "current-step" : ""}>
                                            Step 1: Connect to Data Source
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Choose your data source type:</h5>
                                            <ul>
                                                <li>
                                                    <strong>ClickHouse:</strong> Select if you're connecting to a ClickHouse database.
                                                    <ul>
                                                        <li>Enter the host address (e.g., localhost)</li>
                                                        <li>Specify the port (default is 8123)</li>
                                                        <li>Provide database name, username, and JWT token</li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <strong>Flat File:</strong> Select if you're uploading a CSV file.
                                                    <ul>
                                                        <li>Upload your CSV file using the file selector</li>
                                                        <li>Specify the delimiter used in your CSV (default is comma)</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <Button 
                                                variant="outline-primary" 
                                                className="mt-2"
                                                onClick={() => document.querySelector('input[name="datasource"]')?.focus()}
                                            >
                                                Try it now
                                            </Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header className={currentStep === 2 ? "current-step" : ""}>
                                            Step 2: {source === 'clickhouse' ? "Select Tables" : "Review File Data"}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {source === 'clickhouse' ? (
                                                <>
                                                    <h5>Select Tables from ClickHouse:</h5>
                                                    <ul>
                                                        <li>View the available tables in your database</li>
                                                        <li>Select one or more tables you want to work with</li>
                                                        <li>Click "Confirm Selection" to proceed</li>
                                                    </ul>
                                                </>
                                            ) : (
                                                <>
                                                    <h5>Review Your File Data:</h5>
                                                    <ul>
                                                        <li>The system has read your CSV file</li>
                                                        <li>Column headers have been detected</li>
                                                        <li>Proceed to select columns in the next step</li>
                                                    </ul>
                                                </>
                                            )}
                                            {isConnected && (
                                                <Button 
                                                    variant="outline-primary" 
                                                    className="mt-2"
                                                    onClick={() => {
                                                        const tableElement = document.querySelector('.table-selector-component');
                                                        if (tableElement) tableElement.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                >
                                                    Focus on this step
                                                </Button>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header className={currentStep === 3 ? "current-step" : ""}>
                                            Step 3: Select Columns
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Choose Columns for Processing:</h5>
                                            <ul>
                                                <li>Review all available columns from your {source === 'clickhouse' ? 'selected tables' : 'CSV file'}</li>
                                                <li>Select columns you want to include in your data ingestion</li>
                                                <li>Column selection will determine what data will be processed</li>
                                                <li>Click "Confirm Column Selection" when done</li>
                                            </ul>
                                            {isConnected && tables.length > 0 && (
                                                <Button 
                                                    variant="outline-primary" 
                                                    className="mt-2"
                                                    onClick={() => {
                                                        const columnElement = document.querySelector('.column-selector-component');
                                                        if (columnElement) columnElement.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                >
                                                    Focus on columns
                                                </Button>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header className={currentStep === 4 ? "current-step" : ""}>
                                            Step 4: Configure and Start Ingestion
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <h5>Final Configuration:</h5>
                                            <ul>
                                                <li>Set additional parameters for data processing</li>
                                                <li>Configure destination settings</li>
                                                <li>Review your selections before proceeding</li>
                                                <li>Click "Start Ingestion" to begin the data processing</li>
                                                <li>You can monitor the progress as data is ingested</li>
                                            </ul>
                                            {selectedColumns.length > 0 && (
                                                <Button 
                                                    variant="outline-primary" 
                                                    className="mt-2"
                                                    onClick={() => {
                                                        const ingestionElement = document.querySelector('.ingestion-control-component');
                                                        if (ingestionElement) ingestionElement.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                >
                                                    Go to ingestion controls
                                                </Button>
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                                
                                <div className="mt-4">
                                    <h5>Current Status:</h5>
                                    <div className="status-indicator p-3 bg-light border rounded">
                                        <p className="mb-1"><strong>Data Source:</strong> {source ? (source === 'clickhouse' ? 'ClickHouse Database' : 'CSV File') : 'Not selected'}</p>
                                        <p className="mb-1"><strong>Connection Status:</strong> {isConnected ? 'Connected' : 'Not connected'}</p>
                                        {source === 'clickhouse' && (
                                            <p className="mb-1"><strong>Tables Selected:</strong> {tables.length > 0 ? tables.join(', ') : 'None'}</p>
                                        )}
                                        {source === 'flatfile' && (
                                            <p className="mb-1"><strong>File:</strong> {filePath ? filePath.name : 'None'}</p>
                                        )}
                                        <p className="mb-0"><strong>Columns Selected:</strong> {selectedColumns.length > 0 ? `${selectedColumns.length} columns` : 'None'}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <h5>Quick Tips:</h5>
                                    <div className="tips-container p-3 bg-light border rounded">
                                        <ul className="mb-0">
                                            <li>For ClickHouse connections, ensure your JWT token is valid</li>
                                            <li>Large CSV files may take some time to process</li>
                                            <li>You can reset the process at any time using the Reset button</li>
                                            <li>Selected columns will be used for data transformation</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8} lg={6}>
                    <Card className="card mb-4">
                        <Card.Body>
                            <ConnectionForm
                                onConnect={handleConnect}
                                onFileColumns={handleFileColumns}
                            />
                        </Card.Body>
                    </Card>
                    {isConnected && source === 'clickhouse' && (
                        <Card className="card mb-4">
                            <Card.Body>
                                <TableSelector onSelectTable={handleSelectTable} />
                                {tables.length > 0 && (
                                    <ColumnSelector
                                        table={tables[0]}
                                        tables={tables}
                                        onSelectColumns={handleSelectColumns}
                                        columns={columns}
                                        source={source}
                                    />
                                )}
                            </Card.Body>
                        </Card>
                    )}
                    {isConnected && source === 'flatfile' && (
                        <Card className="card mb-4">
                            <Card.Body>
                                <ColumnSelector
                                    table=""
                                    tables={[]}
                                    onSelectColumns={handleSelectColumns}
                                    columns={fileColumns}
                                    source={source}
                                />
                            </Card.Body>
                        </Card>
                    )}
                    {isConnected && (
                        <Card className="card">
                            <Card.Body>
                                <IngestionControl
                                    source={source}
                                    tables={source === 'clickhouse' ? tables : []}
                                    columns={source === 'clickhouse' ? selectedColumns : []}
                                    fileColumns={source === 'flatfile' ? selectedColumns : []}
                                    filePath={source === 'flatfile' ? filePath : null}
                                    onReset={handleReset}
                                />
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default App;