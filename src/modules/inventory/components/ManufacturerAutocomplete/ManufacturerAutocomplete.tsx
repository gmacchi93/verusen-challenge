import React, { SyntheticEvent, useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SEARCH_MANUFACTURER_RESULT_QUERY } from "../../graphql/inventory.queries";
import { useLazyQuery } from "@apollo/client";
import { Manufacturer } from "../../types/material.types";

type Props = {
  initial?: Manufacturer;
  onChange: (value: Manufacturer | null) => void;
};

const ManufacturerAutocomplete = ({ initial, onChange }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const [fetchManufacturers, { data, loading }] = useLazyQuery<
    { searchManufacturers: Manufacturer[] },
    { name: string }
  >(SEARCH_MANUFACTURER_RESULT_QUERY);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    newValue: Manufacturer | null
  ) => {
    onChange(newValue);
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
        defaultValue={initial}
        loading={loading}
        options={data?.searchManufacturers ?? []}
        getOptionLabel={(option: Manufacturer) => option.manufacturerName}
        id="disable-close-on-select"
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

export default ManufacturerAutocomplete;
