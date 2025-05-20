import React from "react";
import { Typography, Grid, Box, Container, Paper } from "@mui/material";
import {
  LocationOn,
  DateRange,
  Group,
  Phone,
  Email,
  Language,
  Business,
  MonetizationOn,
  Numbers,
  CreditCard,
  PinDrop,
  Apartment,
  Gavel,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useCompany } from "../../hooks";
import { CompanyType } from "../../types/company.type";

const CompanyDetails: React.FC = () => {
  const { id } = useParams();
  const { data: companyData } = useCompany.useGetCompanyRasmio(Number(id));

  if (!companyData || Array.isArray(companyData)) return null;

  const company = companyData as CompanyType;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          backdropFilter: "blur(6px)",
          border: "1px solid #eee",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            gap: 6,
            mb: 10,
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "35%" },
              maxWidth: "450px",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src="https://taxxcelerate.com/wp-content/uploads/2024/06/pexels-photo-269077-269077.jpg"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
              alt={company.title}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 1,
                fontSize: { xs: "1.2rem", md: "1.8rem" },
              }}
            >
              {company.title || "نام شرکت ثبت نشده"}
            </Typography>
            <Box
              sx={{
                height: "4px",
                width: "60px",
                bgcolor: "primary.main",
                borderRadius: 10,
              }}
            />
          </Box>
        </Box>

        {/* اطلاعات شرکت */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {[
            {
              icon: LocationOn,
              label: "آدرس",
              value: company.address || "ثبت نشده",
            },
            {
              icon: PinDrop,
              label: "کد پستی",
              value: company.postal_code || "ثبت نشده",
            },
            {
              icon: DateRange,
              label: "تاریخ ثبت",
              value: company.persian_registration_date || "ثبت نشده",
            },
            {
              icon: Phone,
              label: "تلفن",
              value: company.tel || "ثبت نشده",
            },
            {
              icon: Email,
              label: "ایمیل",
              value: company.email || "ثبت نشده",
            },
            {
              icon: Language,
              label: "وبسایت",
              value: company.website || "ثبت نشده",
            },
            {
              icon: MonetizationOn,
              label: "سرمایه ثبت شده",
              value:
                company.capital?.toLocaleString("fa-IR") + " ریال" ||
                "ثبت نشده",
            },
            {
              icon: CreditCard,
              label: "شناسه ملی",
              value: company.national_id || "ثبت نشده",
            },
            {
              icon: Numbers,
              label: "شماره ثبت",
              value: company.registration_number  || "ثبت نشده",
            },
            {
              icon: Business,
              label: "نوع ثبت",
              value: company.registration_type_title || "ثبت نشده",
            },
            {
              icon: Apartment,
              label: "واحد ثبتی",
              value: company.registration_unit || "ثبت نشده",
            },
            {
              icon: Gavel,
              label: "اداره ثبت",
              value: company.general_directorate || "ثبت نشده",
            },
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "rgba(0, 140, 255, 0.04)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(0, 140, 255, 0.07)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <item.icon sx={{ color: "primary.main", mr: 2, fontSize: 28 }} />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#666", display: "block", mb: 0.5 }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#222", fontWeight: 600 }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* اعضای هیئت مدیره */}
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#222",
            fontWeight: 600,
            mb: 2,
            gap: 1.5,
          }}
        >
          <Group sx={{ color: "primary.main", fontSize: 28 }} />
          اعضای هیئت مدیره
        </Typography>

        <Typography
          sx={{ color: "#888", fontStyle: "italic", fontSize: "0.95rem" }}
        >
          اطلاعاتی در مورد اعضای هیئت مدیره ثبت نشده است.
        </Typography>
      </Paper>
    </Container>
  );
};

export default CompanyDetails;
