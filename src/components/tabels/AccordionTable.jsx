import React from "react";
import Accordion from "react-bootstrap/Accordion";
import TableCreate from "./TableCreate";
import "../../styles/TableCreate.css";
import { useData } from "../../contextApi/DataContext";

export const AccordionTable = () => {

  const {queryResult, tables} = useData();

  return (
    <Accordion className="w-100">
      <Accordion.Item eventKey="0">
      <Accordion.Header>
        {tables && tables.length > 0 ? (
          `Tables: ${tables.join(", ")}`
        ) : (
          <p>Tables are not created</p>
        )}
      </Accordion.Header>

        <Accordion.Body>
          <div className="d-flex gap-3">
            {queryResult &&
              queryResult.map((item, index) => (
                <div>
                  <p>Table : {tables && tables[index]}</p>
                  <TableCreate
                    key={index}
                    columns={item && item.result[0].columns}
                    values={item && item.result[0].values}
                  />
                </div>
              ))}
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
