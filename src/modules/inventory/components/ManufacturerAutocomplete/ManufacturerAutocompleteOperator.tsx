import React, { SyntheticEvent, useEffect, useState } from "react";
import { GridFilterInputValueProps } from "@mui/x-data-grid";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SEARCH_MANUFACTURER_RESULT_QUERY } from "../../graphql/inventory.queries";
import { useLazyQuery } from "@apollo/client";
import { Manufacturer } from "../../types/material.types";

const ManufacturerAutocompleteOperator = (props: GridFilterInputValueProps) => {
  const { item, applyValue } = props;
  const [inputValue, setInputValue] = useState(item.value ?? "");

  const [fetchManufacturers, { data, loading }] = useLazyQuery<
    { searchManufacturers: Manufacturer[] },
    { name: string }
  >(SEARCH_MANUFACTURER_RESULT_QUERY);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: { id: string; name: string } | null
  ) => {
    applyValue({ ...item, value: newValue });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchManufacturers({
        variables: {
          name: inputValue,
        },
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [inputValue, fetchManufacturers]);

  return (
    <FormControl size="small" sx={{ width: "100%" }}>
      <Autocomplete
        loading={loading}
        options={
          data?.searchManufacturers.map((m) => ({
            id: m.id,
            name: m.manufacturerName,
          })) ?? []
        }
        getOptionLabel={(option: { name: string }) => option.name}
        id="disable-close-on-select"
        disableCloseOnSelect
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Manufacturer"
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        )}
      />
    </FormControl>
  );
};

export default ManufacturerAutocompleteOperator;
