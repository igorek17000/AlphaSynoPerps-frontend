import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

export const StatTable = ({
  headingRow,
  tableRows,
  onRowClick,
  activeRow,
  ...props
}) => {
  return (
    <TableContainer maxH="100%" overflowY="auto" overflowX="hidden">
      <Table variant="simple" size="sm" {...props}>
        <Thead position={'sticky'} top="0" bgColor="gray.800">
          <Tr w="100%">
            {headingRow.map((heading, ind) => (
              <Th key={`${ind}`}>{heading}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableRows.map((row, ind) => (
            <Tr
              key={`${ind}`}
              _hover={
                !(activeRow === ind) && {
                  bgColor: 'gray.600',
                  cursor: 'pointer',
                }
              }
              bgColor={activeRow === ind && 'gray.700'}
              onClick={() => {
                onRowClick && onRowClick(row, ind);
              }}
            >
              {row.map((cell, ind) => (
                <Td key={`${ind}`}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
