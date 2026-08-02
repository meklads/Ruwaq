import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { OffPlanProject } from "@/content/off-plan-projects";
import {
  formatOffPlanPrice,
  projectDeveloperName,
  projectLocation,
  projectTitle,
} from "@/content/off-plan-projects";
import type { Locale } from "@/shared/i18n/locale";
import { registerProposalPdfFonts, PDF_FONT_FAMILY } from "@/modules/proposal/pdf/register-pdf-fonts";

function createStyles(locale: Locale) {
  const isRtl = locale === "ar";
  return StyleSheet.create({
    page: {
      fontFamily: PDF_FONT_FAMILY,
      fontSize: 11,
      padding: 48,
      color: "#1a1a1a",
      direction: isRtl ? "rtl" : "ltr",
      lineHeight: 1.5,
    },
    eyebrow: {
      fontSize: 9,
      color: "#8a6d2f",
      letterSpacing: 1,
      marginBottom: 8,
      textTransform: "uppercase",
    },
    title: {
      fontSize: 24,
      fontWeight: 700,
      marginBottom: 6,
      color: "#0f2c59",
    },
    subtitle: {
      fontSize: 12,
      color: "#5c6470",
      marginBottom: 24,
    },
    section: {
      marginBottom: 18,
      paddingBottom: 14,
      borderBottomWidth: 1,
      borderBottomColor: "#e8e4dc",
    },
    label: {
      fontSize: 9,
      color: "#8a8f98",
      marginBottom: 4,
    },
    value: {
      fontSize: 12,
      fontWeight: 700,
    },
    footer: {
      position: "absolute",
      bottom: 36,
      left: 48,
      right: 48,
      fontSize: 8,
      color: "#8a8f98",
      textAlign: "center",
    },
    disclaimer: {
      fontSize: 8,
      color: "#8a8f98",
      marginTop: 12,
    },
  });
}

function BrochureDocument({ project, locale }: { project: OffPlanProject; locale: Locale }) {
  const styles = createStyles(locale);
  const title = projectTitle(project, locale);
  const developer = projectDeveloperName(project, locale);
  const location = projectLocation(project, locale);
  const price = formatOffPlanPrice(project.startingPrice, locale);
  const delivery = locale === "ar" ? project.deliveryDateAr : project.deliveryDateEn;
  const payment = locale === "ar" ? project.paymentPlanAr : project.paymentPlanEn;
  const types = locale === "ar" ? project.propertyTypesAr.join(" · ") : project.propertyTypesEn.join(" · ");
  const ownership = locale === "ar" ? project.ownershipAr : project.ownershipEn;

  const labels =
    locale === "ar"
      ? {
          eyebrow: "إطلاق حصري — رواق",
          developer: "المطور",
          location: "الموقع",
          price: "السعر عند الإطلاق",
          delivery: "موعد التسليم",
          payment: "خطة السداد",
          types: "أنواع العقارات",
          ownership: "نوع الملكية",
          footer: "Ruwaq · ruwaq.co/tours",
          disclaimer:
            "هذا الكتيب لأغراض تسويقية. الأسعار والمواصفات قابلة للتغيير. يرجى التحقق من المطور قبل أي التزام.",
        }
      : {
          eyebrow: "Exclusive launch — Ruwaq",
          developer: "Developer",
          location: "Location",
          price: "Launch price from",
          delivery: "Delivery",
          payment: "Payment plan",
          types: "Property types",
          ownership: "Ownership",
          footer: "Ruwaq · ruwaq.co/tours",
          disclaimer:
            "Marketing brochure only. Prices and specifications subject to change. Verify with the developer before commitment.",
        };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>{labels.eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{developer}</Text>

        <View style={styles.section}>
          <Text style={styles.label}>{labels.developer}</Text>
          <Text style={styles.value}>{developer}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{labels.location}</Text>
          <Text style={styles.value}>{location}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{labels.price}</Text>
          <Text style={styles.value}>{price}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{labels.delivery}</Text>
          <Text style={styles.value}>{delivery}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{labels.payment}</Text>
          <Text style={styles.value}>{payment}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{labels.types}</Text>
          <Text style={styles.value}>{types}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>{labels.ownership}</Text>
          <Text style={styles.value}>{ownership}</Text>
        </View>

        <Text style={styles.disclaimer}>{labels.disclaimer}</Text>
        <Text style={styles.footer}>{labels.footer}</Text>
      </Page>
    </Document>
  );
}

export async function buildProjectBrochurePdfBuffer(
  project: OffPlanProject,
  locale: Locale
): Promise<Buffer> {
  registerProposalPdfFonts();
  return renderToBuffer(<BrochureDocument project={project} locale={locale} />);
}
