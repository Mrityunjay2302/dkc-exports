import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { processesData } from "FakeDB";
import { trimData } from "FakeDB";
import { accessoriesData } from "FakeDB";
import { stagesToBeSkippedData } from "FakeDB";
import { fabricTypesData } from "FakeDB";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { getTodayDate } from "Utils";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "85%",
  bgcolor: "background.paper",
  borderRadius: "1rem",
  overflowY: "auto",
  // border: '2px solid #000',
  boxShadow: 20,
  p: 2,
};

const HomePage = () => {
  const [formData, setFormData] = useState({
    startDate: getTodayDate(),
    endDate: getTodayDate(),
    productionPerDayPerMachine: "",
    totalOrderQuantity: "",
    internationalFabric: true,
    fabricSections: [
      {
        fabricTypes: [],
        processes: [],
        stagesToBeSkipped: [],
        perPieceRequirement: "",
        chooseUnit: "meter",
        colorsAndQuantities: [{ color: "", quantity: "" }],
      },
    ],
  });

  const [selectedChinaFabricTypes, setSelectedChinaFabricTypes] = useState([]);
  const [selectedAccessoriesData, setSelectedAccessoriesData] = useState([]);
  const [selectedTrimData, setSelectedTrimData] = useState([]);
  const [selectedAllMajorFabricTypes, setSelectedAllMajorFabricTypes] =
    useState({ title: "None", type: "none" });

  // states for modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleChange = (e, sectionIndex = 0, colorIndex = null) => {
  //   const { name, value } = e.target;
  //   const updatedFabricSections = [...formData.fabricSections];

  //   if (name === "chooseUnit") {
  //     const updatedFabricSections = [...formData.fabricSections];
  //     updatedFabricSections[sectionIndex] = {
  //       ...updatedFabricSections[sectionIndex],
  //       [name]: value,
  //     };

  //     setFormData({
  //       ...formData,
  //       fabricSections: updatedFabricSections,
  //     });
  //   } else if (name === "perPieceRequirement") {
  //     const updatedFabricSections = [...formData.fabricSections];
  //     updatedFabricSections[sectionIndex] = {
  //       ...updatedFabricSections[sectionIndex],
  //       [name]: value,
  //     };

  //     setFormData({
  //       ...formData,
  //       fabricSections: updatedFabricSections,
  //     });
  //   } else if (
  //     colorIndex !== null &&
  //     (name === "color" || name === "quantity")
  //   ) {
  //     // Update specific color or quantity
  //     const updatedColorsAndQuantities = [
  //       ...updatedFabricSections[sectionIndex].colorsAndQuantities,
  //     ];
  //     updatedColorsAndQuantities[colorIndex][name] = value;

  //     updatedFabricSections[sectionIndex] = {
  //       ...updatedFabricSections[sectionIndex],
  //       colorsAndQuantities: updatedColorsAndQuantities,
  //     };

  //     setFormData({
  //       ...formData,
  //       fabricSections: updatedFabricSections,
  //     });
  //   } else {
  //     setFormData({
  //       ...formData,
  //       [name]: value,
  //     });
  //   }
  // };

  const handleChange = (e, sectionIndex = 0, colorIndex = null) => {
    const { name, value } = e.target;

    const sanitizedValue =
      name === "productionPerDayPerMachine" || name === "totalOrderQuantity"
        ? value?.replace(/[^0-9]/g, "") // Allow only integers
        : name === "perPieceRequirement"
        ? value?.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
        : name === "color"
        ? value?.replace(/[^a-zA-Z]/g, "")
        : name === "quantity"
        ? value?.replace(/[^0-9]/g, "")
        : value;

    const updatedFabricSections = [...formData.fabricSections];

    if (name === "chooseUnit" || name === "perPieceRequirement") {
      updatedFabricSections[sectionIndex] = {
        ...updatedFabricSections[sectionIndex],
        [name]: sanitizedValue,
      };

      setFormData({
        ...formData,
        fabricSections: updatedFabricSections,
      });
    } else if (
      colorIndex !== null &&
      (name === "color" || name === "quantity")
    ) {
      const updatedColorsAndQuantities = [
        ...updatedFabricSections[sectionIndex].colorsAndQuantities,
      ];
      updatedColorsAndQuantities[colorIndex][name] = sanitizedValue;

      updatedFabricSections[sectionIndex] = {
        ...updatedFabricSections[sectionIndex],
        colorsAndQuantities: updatedColorsAndQuantities,
      };

      setFormData({
        ...formData,
        fabricSections: updatedFabricSections,
      });
    } else {
      setFormData({
        ...formData,
        [name]: sanitizedValue,
      });
    }
  };

  const handleRadioChange = (event) => {
    const value = event.target.value === "true"; // Ensure the value is a boolean
    setFormData({
      ...formData,
      internationalFabric: value,
    });

    // Clear selectedChinaFabricTypes when "No" is selected
    if (!value) {
      setSelectedChinaFabricTypes([]); // Reset to empty array when "No" is selected
    }
  };

  // ADD MORE COLORS AND QUANTITIES
  const handleAddMore = (sectionIndex = 0) => {
    const updatedFabricSections = [...formData.fabricSections];
    updatedFabricSections[sectionIndex].colorsAndQuantities.push({
      color: "",
      quantity: "",
    });

    setFormData({
      ...formData,
      fabricSections: updatedFabricSections,
    });
  };

  // ADD MORE FABRIC SECTION
  const handleAddFabricSection = () => {
    const newFabricSection = {
      fabricTypes: [],
      processes: [],
      stagesToBeSkipped: [],
      perPieceRequirement: "",
      chooseUnit: "meter",
      colorsAndQuantities: [{ color: "", quantity: "" }],
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      fabricSections: [...prevFormData.fabricSections, newFabricSection],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if fabricTypes are empty in any section
    const isFabricTypesValid = formData.fabricSections.every(
      (section) => section.fabricTypes.length > 0
    );

    // Check if processes are empty in any section
    const isProcessesValid = formData.fabricSections.every(
      (section) => section.processes.length > 0
    );

    // Check if stagesToBeSkipped is empty in any section
    const isStagesToBeSkippedValid = formData.fabricSections.every(
      (section) => section.stagesToBeSkipped.length > 0
    );

    // Check if selectedChinaFabricTypes is empty
    const isChinaFabricTypesValid =
      selectedChinaFabricTypes.length > 0 && formData.internationalFabric;

    // Check if selectedAccessoriesData is empty
    const isAccessoriesDataValid = selectedAccessoriesData.length > 0;

    // Check if selectedTrimData is empty
    const isTrimDataValid = selectedTrimData.length > 0;

    // Calculate the total sum of quantities
    const totalQuantity = formData.fabricSections.reduce((sum, section) => {
      const sectionTotalQuantity = section.colorsAndQuantities.reduce(
        (quantitySum, item) => quantitySum + (parseInt(item.quantity) || 0),
        0
      );
      return sum + sectionTotalQuantity;
    }, 0);

    // Compare the total quantity with totalOrderQuantity
    if (totalQuantity > parseInt(formData.totalOrderQuantity)) {
      toast.error("Total quantity exceeds the order quantity.");
      return;
    }

    // Display error messages if any validation fails
    if (!isFabricTypesValid) {
      toast.error("Fabric Name cannot be empty.");
      return;
    }

    if (!isProcessesValid) {
      toast.error("Processes cannot be empty.");
      return;
    }

    if (!isStagesToBeSkippedValid) {
      toast.error("Stages To Be Skipped cannot be empty.");
      return;
    }

    if (formData.internationalFabric && !isChinaFabricTypesValid) {
      toast.error("China Fabric Types cannot be empty.");
      return;
    }

    if (!isTrimDataValid) {
      toast.error("Trim Data cannot be empty.");
      return;
    }

    if (!isAccessoriesDataValid) {
      toast.error("Accessories Data cannot be empty.");
      return;
    }

    // Proceed with form submission if all validations are successful
    toast.success("Form submitted successfully");
    handleOpen();
  };

  const allSelectedFabricTypes = [
    ...new Map(
      formData?.fabricSections
        ?.flatMap((section) => section?.fabricTypes)
        .map((item) => [item?.title, item]) // Use `title` as the unique key
    ).values(),
  ];

  const allMajorFabricTypes = [
    { title: "None", type: "none" },
    ...[
      ...new Map(
        (
          formData?.fabricSections?.flatMap(
            (section) => section?.fabricTypes
          ) || []
        ).map((item) => [item.title, item]) // Use `title` as the unique key
      ).values(),
    ],
  ];

  const allUniqueChinaFabricTypes = [
    ...new Map(
      selectedChinaFabricTypes.map((fabric) => [fabric?.title, fabric])
    ).values(),
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          pt: "2rem",
          px: "4rem",
        }}
      >
        <Typography variant="h4" fontWeight={600} sx={{ textAlign: "center" }}>
          T&A DATA SUBMISSION FORM
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "5rem",
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ fontSize: ".9rem", mb: ".5rem" }}
                >
                  Start Date
                </Typography>
                <TextField
                  required
                  type="date"
                  size="small"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.625rem",
                    },
                  }}
                />
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ fontSize: ".9rem", mb: ".5rem" }}
                >
                  End Date
                </Typography>
                <TextField
                  required
                  type="date"
                  size="small"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  inputProps={{
                    min: formData.startDate, // Set minimum date to startDate
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.625rem",
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "5rem",
              }}
            >
              <FormControl sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ fontSize: ".9rem", mb: ".5rem" }}
                >
                  Production Per Day Per Machine
                </Typography>
                <TextField
                  required
                  type="text"
                  size="small"
                  name="productionPerDayPerMachine"
                  placeholder="Eg: 100"
                  value={formData.productionPerDayPerMachine}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.625rem",
                    },
                  }}
                />
              </FormControl>

              <FormControl sx={{ width: "100%" }}>
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ fontSize: ".9rem", mb: ".5rem" }}
                >
                  Total Order Quantity
                </Typography>
                <TextField
                  required
                  type="text"
                  size="small"
                  name="totalOrderQuantity"
                  placeholder="Eg: 1000"
                  value={formData.totalOrderQuantity}
                  onChange={handleChange}
                  sx={{
                    "& .MuiInputBase-root": {
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.625rem",
                    },
                  }}
                />
              </FormControl>
            </Box>

            <Divider sx={{ mt: "2rem" }} />

            <Box>
              {formData?.fabricSections?.map((section, sectionIndex) => (
                <Box
                  key={sectionIndex}
                  sx={{
                    borderRadius: "1rem",
                    overflow: "hidden",
                    mb: "4rem",
                    p: "2rem",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight={400}
                      sx={{ mb: "2rem" }}
                    >
                      Fabric Section {sectionIndex + 1}
                    </Typography>
                    <Autocomplete
                      multiple
                      id={`fabric-types-${sectionIndex}`}
                      options={fabricTypesData?.filter(
                        (option) =>
                          !formData?.fabricSections[
                            sectionIndex
                          ]?.fabricTypes.some(
                            (selected) => selected?.title === option.title
                          )
                      )}
                      getOptionLabel={(option) => option.title}
                      value={section.fabricTypes}
                      onChange={(event, newValue) => {
                        const updatedFabricSections = [
                          ...formData.fabricSections,
                        ];
                        updatedFabricSections[sectionIndex] = {
                          ...updatedFabricSections[sectionIndex],
                          fabricTypes: newValue,
                        };
                        setFormData({
                          ...formData,
                          fabricSections: updatedFabricSections,
                        });
                      }}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Fabric Name"
                          placeholder="Add Fabric Name"
                          sx={{
                            "& .MuiInputBase-root": {
                              width: "100%",
                              borderRadius: "0.625rem",
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <FormControl sx={{ width: "100%", mt: "1rem" }}>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: ".9rem", mb: ".5rem" }}
                    >
                      Per Piece Requirement
                    </Typography>
                    <TextField
                      required
                      type="text"
                      size="small"
                      name="perPieceRequirement"
                      placeholder="Eg: 0.7"
                      value={section.perPieceRequirement}
                      onChange={(e) => handleChange(e, sectionIndex)}
                      sx={{
                        "& .MuiInputBase-root": {
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0.625rem",
                        },
                      }}
                    />
                  </FormControl>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem", mb: ".5rem" }}
                    >
                      Choose Unit
                    </Typography>
                    <FormGroup
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={section.chooseUnit === "meter"}
                            onChange={(e) => handleChange(e, sectionIndex)}
                            name="chooseUnit"
                            value="meter"
                          />
                        }
                        label="Meter"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={section.chooseUnit === "kg"}
                            onChange={(e) => handleChange(e, sectionIndex)}
                            name="chooseUnit"
                            value="kg"
                          />
                        }
                        label="Kg"
                      />
                    </FormGroup>
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem", mb: ".5rem" }}
                    >
                      Processes
                    </Typography>
                    <Autocomplete
                      multiple
                      id={`processes-${sectionIndex}`}
                      options={processesData?.filter(
                        (option) =>
                          !formData?.fabricSections[
                            sectionIndex
                          ]?.processes?.some(
                            (selected) => selected?.title === option.title
                          )
                      )}
                      getOptionLabel={(option) => option.title}
                      value={section.processes}
                      onChange={(event, newValue) => {
                        const updatedFabricSections = [
                          ...formData.fabricSections,
                        ];
                        updatedFabricSections[sectionIndex] = {
                          ...updatedFabricSections[sectionIndex],
                          processes: newValue,
                        };
                        setFormData({
                          ...formData,
                          fabricSections: updatedFabricSections,
                        });
                      }}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Process Name"
                          placeholder="Add Process Name"
                          sx={{
                            "& .MuiInputBase-root": {
                              width: "100%",
                              borderRadius: "0.625rem",
                            },
                          }}
                        />
                      )}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem", mb: ".5rem" }}
                    >
                      Color And Quantity
                    </Typography>
                    {section?.colorsAndQuantities?.map(
                      (colorData, colorIndex) => (
                        <Box
                          key={colorIndex}
                          sx={{ display: "flex", gap: "5rem", mt: "1rem" }}
                        >
                          <FormControl sx={{ flex: 1 }}>
                            <TextField
                              required
                              label="Color"
                              size="small"
                              name="color"
                              placeholder="Eg: Red"
                              value={colorData?.color}
                              onChange={(e) =>
                                handleChange(e, sectionIndex, colorIndex)
                              }
                              sx={{
                                "& .MuiInputBase-root": {
                                  width: "100%",
                                  height: "3rem",
                                  borderRadius: "0.625rem",
                                },
                              }}
                            />
                          </FormControl>
                          <FormControl sx={{ flex: 1 }}>
                            <TextField
                              required
                              label="Quantity"
                              size="small"
                              name="quantity"
                              placeholder="Eg: 100"
                              value={colorData?.quantity}
                              onChange={(e) =>
                                handleChange(e, sectionIndex, colorIndex)
                              }
                              sx={{
                                "& .MuiInputBase-root": {
                                  width: "100%",
                                  height: "3rem",
                                  borderRadius: "0.625rem",
                                },
                              }}
                            />
                          </FormControl>
                        </Box>
                      )
                    )}
                    <Button
                      endIcon={<AddIcon />}
                      variant="contained"
                      sx={{
                        mt: "1rem",
                        height: "3rem",
                        width: "15rem",
                        textTransform: "capitalize",
                        fontSize: "1rem",
                        fontWeight: 400,
                      }}
                      onClick={() => handleAddMore(sectionIndex)}
                    >
                      Add More Colors
                    </Button>
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem", mb: ".5rem" }}
                    >
                      Stages To Be Skipped
                    </Typography>
                    <Autocomplete
                      multiple
                      id={`stages-${sectionIndex}`}
                      options={stagesToBeSkippedData?.filter(
                        (option) =>
                          !formData.fabricSections[
                            sectionIndex
                          ].stagesToBeSkipped.some(
                            (selected) => selected?.title === option.title
                          )
                      )}
                      getOptionLabel={(option) => option.title}
                      value={section.stagesToBeSkipped}
                      onChange={(event, newValue) => {
                        const updatedFabricSections = [
                          ...formData.fabricSections,
                        ];
                        updatedFabricSections[sectionIndex] = {
                          ...updatedFabricSections[sectionIndex],
                          stagesToBeSkipped: newValue,
                        };
                        setFormData({
                          ...formData,
                          fabricSections: updatedFabricSections,
                        });
                      }}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Stages To Skipped"
                          placeholder="Add Stages"
                          sx={{
                            "& .MuiInputBase-root": {
                              width: "100%",
                              borderRadius: "0.625rem",
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              ))}

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="button"
                  variant="contained"
                  endIcon={<AddIcon />}
                  sx={{
                    mt: "-2rem",
                    height: "3.5rem",
                    width: "15rem",
                    textTransform: "capitalize",
                    fontSize: "1rem",
                    fontWeight: 400,
                  }}
                  onClick={handleAddFabricSection}
                >
                  Add More Fabric
                </Button>
              </Box>
            </Box>

            <FormControl component="fieldset">
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ fontSize: "1.2rem", mb: ".5rem" }}
              >
                Is China Fabric Present?
              </Typography>
              <RadioGroup
                sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                name="internationalFabric"
                value={formData?.internationalFabric}
                onChange={handleRadioChange} // Call the updated handler
              >
                <FormControlLabel
                  sx={{ width: "5rem" }}
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  sx={{ width: "5rem" }}
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>

            {formData?.internationalFabric ? (
              <Box>
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ fontSize: "1.2rem", mb: ".5rem" }}
                >
                  Select China Fabric
                </Typography>

                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={allSelectedFabricTypes}
                  getOptionLabel={(option) => option.title}
                  value={selectedChinaFabricTypes}
                  onChange={(event, newValue) => {
                    setSelectedChinaFabricTypes(newValue);
                  }}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select China Fabric"
                      sx={{
                        "& .MuiInputBase-root": {
                          width: "100%",
                          borderRadius: "0.625rem",
                        },
                      }}
                    />
                  )}
                />
              </Box>
            ) : null}

            <Box>
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ fontSize: "1.2rem", mb: ".5rem" }}
              >
                Choose Major Fabric
              </Typography>

              <Autocomplete
                id="tags-outlined"
                options={allMajorFabricTypes}
                getOptionLabel={(option) => option.title}
                value={selectedAllMajorFabricTypes}
                onChange={(event, newValue) => {
                  setSelectedAllMajorFabricTypes(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Major Fabric"
                    sx={{
                      "& .MuiInputBase-root": {
                        width: "100%",
                        borderRadius: "0.625rem",
                      },
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{
                  fontSize: "1.2rem",
                  mb: ".5rem",
                }}
              > 
                Trims
              </Typography>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={trimData?.filter(
                  (option) =>
                    !selectedTrimData?.some(
                      (selected) => selected?.title === option.title
                    )
                )}
                getOptionLabel={(option) => option.title}
                value={selectedTrimData || []}
                onChange={(event, newValue) => {
                  setSelectedTrimData(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Trim"
                    sx={{
                      "& .MuiInputBase-root": {
                        width: "100%",
                        borderRadius: "0.625rem",
                      },
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{
                  fontSize: "1.2rem",
                  mb: ".5rem",
                }}
              >
                Accessories
              </Typography>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={accessoriesData?.filter(
                  (option) =>
                    !selectedAccessoriesData?.some(
                      (selected) => selected?.title === option.title
                    )
                )}
                getOptionLabel={(option) => option.title}
                value={selectedAccessoriesData || []}
                onChange={(event, newValue) => {
                  setSelectedAccessoriesData(newValue);
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Accessories"
                    sx={{
                      "& .MuiInputBase-root": {
                        width: "100%",
                        borderRadius: "0.625rem",
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: "2rem",
              mb: "5rem",
              height: "3.5rem",
              width: "100%",
              textTransform: "capitalize",
              fontSize: "1rem",
              fontWeight: 400,
            }}
          >
            Submit
          </Button>
        </form>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Order Details
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              id="modal-modal-description"
              variant="body1"
              fontWeight={400}
              sx={{ mt: 2, fontSize: "1.2rem" }}
            >
              Start Date&nbsp;:&nbsp;
              <Typography
                variant="caption"
                fontWeight={400}
                sx={{ fontSize: "1.2rem" }}
              >
                {formData?.startDate}
              </Typography>
            </Typography>

            <Typography
              id="modal-modal-description"
              variant="body1"
              fontWeight={400}
              sx={{ mt: 2, fontSize: "1.2rem" }}
            >
              End Date&nbsp;:&nbsp;
              <Typography
                variant="caption"
                fontWeight={400}
                sx={{ fontSize: "1.2rem" }}
              >
                {formData?.endDate}
              </Typography>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".3rem",
                mt: "1rem",
                width: "50%",
              }}
            >
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ fontSize: ".8rem" }}
              >
                Production Per Day Per Machine
              </Typography>
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ fontSize: "1.2rem" }}
              >
                {formData?.productionPerDayPerMachine || "0"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: ".3rem",
                mt: "1rem",
                width: "50%",
              }}
            >
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ fontSize: ".8rem" }}
              >
                Total Order Quantity
              </Typography>
              <Typography
                variant="body1"
                fontWeight={400}
                sx={{ fontSize: "1.2rem" }}
              >
                {formData?.totalOrderQuantity || "0"}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              mt: "1rem",
            }}
          >
            {formData?.fabricSections &&
              formData?.fabricSections.map((section, sectionIndex) => (
                <Box
                  key={sectionIndex}
                  sx={{
                    border: "1px solid gray",
                    padding: "1rem",
                    mb: "1rem",
                    borderRadius: "0.625rem",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Section Title with count */}
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    sx={{
                      color: "primary.main",
                      fontSize: "1.4rem",
                      mb: "1rem",
                    }}
                  >
                    {`Fabric Section ${sectionIndex + 1}`}
                  </Typography>

                  {/* Fabric Names for the current section */}
                  <Typography
                    variant="body1"
                    fontWeight={400}
                    sx={{ fontSize: "1rem", mb: ".5rem" }}
                  >
                    Fabric Names
                  </Typography>

                  {section?.fabricTypes && section?.fabricTypes.length > 0 ? (
                    section?.fabricTypes?.map((type, typeIndex) => (
                      <Typography key={typeIndex} variant="body2">
                        {`${typeIndex + 1}. ${type?.title || "No Fabric Name"}`}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">
                      No Fabric Names Available
                    </Typography>
                  )}

                  {/* Per Piece Requirement for the current section */}
                  <Typography
                    variant="body1"
                    fontWeight={400}
                    sx={{ fontSize: "1.2rem", mb: ".5rem", mt: "1rem" }}
                  >
                    Per Piece Requirement
                  </Typography>
                  <Typography variant="body2">
                    {section?.perPieceRequirement || "No Per Piece Requirement"}
                  </Typography>

                  {/* Show choose unit */}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Choose Unit
                    </Typography>

                    <Typography variant="body2">
                      {section?.chooseUnit || "No Choose Unit"}
                    </Typography>
                  </Box>

                  {/* Processes for the current section */}
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Processes
                    </Typography>
                    {section?.processes && section?.processes.length > 0 ? (
                      section?.processes.map((process, processIndex) => (
                        <Typography key={processIndex} variant="body2">
                          {`${processIndex + 1}. ${
                            process?.title || "No Process"
                          }`}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2">
                        No Processes Available
                      </Typography>
                    )}
                  </Box>

                  {/*  Colors and Quantities section */}
                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Colors and Quantities
                    </Typography>

                    {section?.colorsAndQuantities &&
                    section?.colorsAndQuantities.length > 0 ? (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Color</TableCell>
                            <TableCell>Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {section?.colorsAndQuantities.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.color || "No Color"}</TableCell>
                              <TableCell>
                                {item.quantity || "No Quantity"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <Typography variant="body2">
                        No Colors and Quantities Available
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Processes
                    </Typography>
                    {section?.stagesToBeSkipped &&
                    section?.stagesToBeSkipped.length > 0 ? (
                      section?.stagesToBeSkipped.map((stage, stageIndex) => (
                        <Typography key={stageIndex} variant="body2">
                          {`${stageIndex + 1}. ${stage?.title || "No Stage"}`}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2">
                        No Stages To Be Skipped Available
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Is China Fabric Present?
                    </Typography>
                    <Typography variant="body2">
                      {formData?.internationalFabric !== undefined
                        ? formData.internationalFabric
                          ? "Yes"
                          : "No"
                        : "No Information"}
                    </Typography>
                  </Box>

                  {formData?.internationalFabric && (
                    <Box>
                      <Typography
                        variant="body1"
                        fontWeight={400}
                        sx={{ fontSize: "1.2rem", mt: "1rem" }}
                      >
                        Selected China Fabric Types
                      </Typography>

                      {allUniqueChinaFabricTypes &&
                      allUniqueChinaFabricTypes.length > 0 ? (
                        allUniqueChinaFabricTypes.map((fabric, fabricIndex) => (
                          <Typography key={fabricIndex} variant="body2">
                            {`${fabricIndex + 1}. ${
                              fabric?.title || "No Fabric Name"
                            }`}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2">
                          No Fabrics Available
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Choose Major Fabric
                    </Typography>
                    {selectedAllMajorFabricTypes?.title ? (
                      <Typography variant="body2">
                        {`1. ${
                          selectedAllMajorFabricTypes.title || "No Fabric Name"
                        }`}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        No Fabrics Available
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Selected Trims
                    </Typography>
                    {selectedTrimData && selectedTrimData.length > 0 ? (
                      selectedTrimData.map((trim, trimIndex) => (
                        <Typography key={trimIndex} variant="body2">
                          {`${trimIndex + 1}. ${trim?.title || "No Trim Name"}`}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2">
                        No Trims Available
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      fontWeight={400}
                      sx={{ fontSize: "1.2rem", mt: "1rem" }}
                    >
                      Selected Accessories
                    </Typography>

                    {selectedAccessoriesData &&
                    selectedAccessoriesData.length > 0 ? (
                      selectedAccessoriesData.map(
                        (accessory, accessoryIndex) => (
                          <Typography key={accessoryIndex} variant="body2">
                            {`${accessoryIndex + 1}. ${
                              accessory?.title || "No Accessory Name"
                            }`}
                          </Typography>
                        )
                      )
                    ) : (
                      <Typography variant="body2">
                        No Accessories Available
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default HomePage;
