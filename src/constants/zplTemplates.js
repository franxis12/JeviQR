export const zplTemplates = [
  {
    id: "canvas",
    label: "Canvas",
    description: "Editor visual para personalizar el lienzo.",
  },
  {
    id: "cart",
    label: "Cart Number",
    description: "Número de carrito centrado con QR inferior.",
    build: ({ qrText, customName, style }) => [
      "^XA",
      "^LL600",
      "^FO110,50",
      "^A0N,60,100",
      "^FB600,1,0,C,0",
      `^FD${customName.title || "Cart Number"}^FS`,
      "^FO50,150",
      "^A0N,400,200",
      "^FB750,1,0,C,0",
      `^FD${customName.name || "Name not Found"}^FS`,
      "^FO50,130",
      "^GB700,350,10,B,2^FS",
      "^FO50,490",
      "^GB700,700,10,B,1^FS",
      "^FO85,513",
      "^BQN,2,30",
      `^FD${style.qrCodeLevel || "Q"}A,${qrText.name || ""}^FS`,
      "^XZ",
    ].join("\n"),
  },
   {
    id: "idNumber",
    label: "Id Number",
    description: "Número de assets warehouse",
    build: ({ qrText, customName, style }) => [
      '^XA',
      '^LL600',
      
      '^FO250,50,',
      '^A0R,450,450',
      '^FB1200,1,0,C,0',
      
      `^FD${customName}^FS`,
      
      '^FO50,50',
      '^GB700,1110,6,B,1^FS',
      
      '^FO100,100',
      '^BQN,50,10',
      `^FD${style.qrCodeLevel || "Q"}A,${qrText.name || ""}^FS`,
      
      '^XZ'
         
    ].join("\n"),
  },
  {
    id: "tracking",
    label: "Tracking",
    description: "Pickup, destino y tracking con QR.",
    defaultValues: {
      header: "Warehouse",
      pickupLocation: "Warehouse #4 - RI",
      destination: "John Doe, Miami FL",
      trackingNumber: "TRK123456789",
      cta: "Scan for Tracking",
    },
    fields: [
      { key: "header", label: "Encabezado", placeholder: "Warehouse" },
      {
        key: "pickupLocation",
        label: "Pickup Location",
        placeholder: "Warehouse #4 - RI",
      },
      {
        key: "destination",
        label: "Destination",
        placeholder: "John Doe, Miami FL",
      },
      {
        key: "trackingNumber",
        label: "Tracking Number",
        placeholder: "TRK123456789",
      },
      {
        key: "cta",
        label: "Texto final",
        placeholder: "Scan for Tracking",
      },
    ],
    build: ({ templateValues = {}, qrText }) => {
      const trackingUrl =
        qrText?.name || "https://track.example.com/TRK123456789";

      return [
        "^XA",
        "^PW812",
        "^LL1218",
        "",
        "^CF0,40",
        `^FO50,50^FD${templateValues.header || "Warehouse"}^FS`,
        "^CF0,30",
        "^FO50,100^FDPickup Location:^FS",
        `^FO300,100^FD${
          templateValues.pickupLocation || "Warehouse #4 - RI"
        }^FS`,
        "^FO50,150^FDDestination:^FS",
        `^FO300,150^FD${
          templateValues.destination || "John Doe, Miami FL"
        }^FS`,
        "",
        "^FO50,220^GB700,2,2^FS",
        "^CF0,30",
        "^FO50,240^FDTracking:^FS",
        `^FO300,240^FD${
          templateValues.trackingNumber || "TRK123456789"
        }^FS`,
        "",
        "^FO50,320",
        "^BQN,2,8",
        `^FDQA,${trackingUrl}^FS`,
        "",
        "^CF0,25",
        `^FO300,340^FD${
          templateValues.cta || "Scan for Tracking"
        }^FS`,
        "",
        "^XZ",
      ].join("\n");
    },
  },
];

export const getZplTemplateById = (id) =>
  zplTemplates.find((template) => template.id === id);
