import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import type { QuotePdfPayload } from "./quote-pdf-utils";
import { formatPdfMoney } from "./quote-pdf-utils";
import { PDF_FONT_FAMILY } from "./register-pdf-fonts";
import type { Locale } from "@/shared/i18n/locale";

const navy = "#0f2c59";
const gold = "#c9a227";
const muted = "#5c6470";

const HEADER_H = 72;
const FOOTER_H = 52;

function createStyles(locale: Locale) {
  const isRtl = locale === "ar";

  return StyleSheet.create({
    page: {
      fontFamily: PDF_FONT_FAMILY,
      fontSize: 10,
      paddingTop: HEADER_H + 20,
      paddingBottom: FOOTER_H + 16,
      paddingHorizontal: 40,
      color: "#1a1a1a",
      lineHeight: 1.45,
      direction: isRtl ? "rtl" : "ltr",
    },
    fixedHeader: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: HEADER_H,
      backgroundColor: navy,
      paddingHorizontal: 40,
      paddingVertical: 10,
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 3,
      borderBottomColor: gold,
    },
    headerLogo: {
      width: 48,
      height: 48,
      objectFit: "contain",
      backgroundColor: "rgba(255,255,255,0.08)",
      borderRadius: 4,
    },
    headerLogoPlaceholder: {
      width: 48,
      height: 48,
      borderRadius: 4,
      backgroundColor: "rgba(255,255,255,0.12)",
      alignItems: "center",
      justifyContent: "center",
    },
    headerLogoText: {
      fontSize: 7,
      color: "rgba(255,255,255,0.7)",
      textAlign: "center",
    },
    headerTextCol: {
      flex: 1,
      paddingHorizontal: 12,
      textAlign: isRtl ? "right" : "left",
    },
    headerCompany: {
      fontSize: 11,
      fontWeight: 700,
      color: "#ffffff",
    },
    headerProject: {
      fontSize: 9,
      color: gold,
      marginTop: 2,
    },
    headerMeta: {
      fontSize: 7.5,
      color: "rgba(255,255,255,0.75)",
      marginTop: 3,
      textAlign: isRtl ? "right" : "left",
      maxWidth: 140,
    },
    fixedFooter: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: FOOTER_H,
      paddingHorizontal: 40,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#e0ddd4",
      backgroundColor: "#faf9f6",
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    footerLeft: {
      flex: 1,
      textAlign: isRtl ? "right" : "left",
      paddingRight: 8,
    },
    footerRight: {
      textAlign: isRtl ? "left" : "right",
      minWidth: 72,
    },
    footerCompanyLine: {
      fontSize: 8,
      fontWeight: 700,
      color: navy,
    },
    footerContact: {
      fontSize: 7,
      color: muted,
      marginTop: 2,
    },
    footerDisclaimer: {
      fontSize: 7,
      color: muted,
      marginTop: 3,
      lineHeight: 1.35,
    },
    footerPage: {
      fontSize: 8,
      fontWeight: 700,
      color: navy,
    },
    title: {
      fontSize: 14,
      fontWeight: 700,
      color: navy,
      textAlign: isRtl ? "right" : "left",
      marginBottom: 8,
    },
    intro: {
      fontSize: 10,
      color: muted,
      textAlign: isRtl ? "right" : "left",
      marginBottom: 12,
    },
    metaLine: {
      fontSize: 9,
      color: muted,
      textAlign: isRtl ? "right" : "left",
      marginBottom: 2,
    },
    metaRow: {
      flexDirection: isRtl ? "row-reverse" : "row",
      flexWrap: "wrap",
      marginBottom: 12,
    },
    table: {
      marginTop: 8,
      marginBottom: 16,
    },
    tableHeader: {
      flexDirection: isRtl ? "row-reverse" : "row",
      backgroundColor: navy,
      color: "#fff",
      paddingVertical: 8,
      paddingHorizontal: 6,
      fontWeight: 700,
      fontSize: 9,
      borderWidth: 1,
      borderColor: navy,
    },
    tableRow: {
      flexDirection: isRtl ? "row-reverse" : "row",
      borderBottomWidth: 1,
      borderBottomColor: "#eceae4",
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: "#e0ddd4",
      paddingVertical: 7,
      paddingHorizontal: 6,
      fontSize: 9,
      minHeight: 24,
    },
    tableRowAlt: {
      backgroundColor: "#faf9f6",
    },
    colDesc: {
      width: "40%",
      textAlign: isRtl ? "right" : "left",
      paddingRight: 4,
    },
    colQty: { width: "12%", textAlign: "center" },
    colUnit: { width: "24%", textAlign: isRtl ? "left" : "right" },
    colTotal: { width: "24%", textAlign: isRtl ? "left" : "right", fontWeight: 700 },
    totalsBox: {
      marginTop: 4,
      alignSelf: isRtl ? "flex-start" : "flex-end",
      width: "48%",
      borderWidth: 1,
      borderColor: "#e0ddd4",
      padding: 10,
    },
    totalRow: {
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      marginBottom: 5,
      fontSize: 9,
    },
    grandRow: {
      flexDirection: isRtl ? "row-reverse" : "row",
      justifyContent: "space-between",
      marginTop: 6,
      paddingTop: 6,
      borderTopWidth: 1,
      borderTopColor: gold,
      fontSize: 11,
      fontWeight: 700,
      color: navy,
    },
    sectionTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: navy,
      textAlign: isRtl ? "right" : "left",
      marginTop: 14,
      marginBottom: 6,
    },
    clauseBlock: {
      marginBottom: 8,
      textAlign: isRtl ? "right" : "left",
    },
    clauseCategory: {
      fontSize: 9,
      fontWeight: 700,
      color: navy,
      marginBottom: 2,
    },
    clauseText: {
      fontSize: 8.5,
      color: "#333",
      lineHeight: 1.5,
    },
    estimateNote: {
      fontSize: 8,
      color: "#92400e",
      textAlign: isRtl ? "right" : "left",
      marginBottom: 8,
    },
  });
}

type Props = {
  payload: QuotePdfPayload;
};

function PdfFixedHeader({
  payload,
  styles,
}: {
  payload: QuotePdfPayload;
  styles: ReturnType<typeof createStyles>;
}) {
  const { labels, data, logoSrc } = payload;
  const company = data.companyName?.trim() || labels.logoPlaceholder;
  const metaParts = [
    data.proposalNumber ? `${labels.proposalNumber} ${data.proposalNumber}` : null,
    `${labels.date} ${data.date}`,
  ].filter(Boolean);

  return (
    <View fixed style={styles.fixedHeader}>
      <View style={styles.headerTextCol}>
        <Text style={styles.headerCompany}>{company}</Text>
        <Text style={styles.headerProject}>{data.projectName}</Text>
      </View>
      {logoSrc ? (
        <Image src={logoSrc} style={styles.headerLogo} />
      ) : (
        <View style={styles.headerLogoPlaceholder}>
          <Text style={styles.headerLogoText}>{labels.logoPlaceholder}</Text>
        </View>
      )}
      <View>
        <Text style={styles.headerMeta}>{metaParts.join(" · ")}</Text>
        {data.clientName ? (
          <Text style={styles.headerMeta}>
            {labels.preparedFor} {data.clientName}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function PdfFixedFooter({
  payload,
  styles,
}: {
  payload: QuotePdfPayload;
  styles: ReturnType<typeof createStyles>;
}) {
  const { labels, pdfLabels, data } = payload;
  const contactParts = [
    data.companyPhone,
    data.companyEmail,
    data.crNumber ? `${labels.crNumber} ${data.crNumber}` : null,
    data.vatNumber ? `${labels.vatNumber} ${data.vatNumber}` : null,
  ].filter(Boolean);

  return (
    <View fixed style={styles.fixedFooter}>
      <View style={styles.footerLeft}>
        <Text style={styles.footerCompanyLine}>{data.companyName ?? labels.logoPlaceholder}</Text>
        {contactParts.length > 0 ? (
          <Text style={styles.footerContact}>{contactParts.join(" · ")}</Text>
        ) : null}
        {data.address ? <Text style={styles.footerContact}>{data.address}</Text> : null}
        <Text style={styles.footerDisclaimer}>{labels.footer}</Text>
        {data.poweredByRuwaqFooter ? (
          <Text style={[styles.footerContact, { marginTop: 4, color: muted }]}>
            Powered by Ruwaq
          </Text>
        ) : null}
      </View>
      <View style={styles.footerRight}>
        <Text
          style={styles.footerPage}
          render={({ pageNumber, totalPages }) =>
            pdfLabels.pageOf(pageNumber, totalPages)
          }
        />
      </View>
    </View>
  );
}

export function ProposalQuotePdfDocument({ payload }: Props) {
  const { locale, labels, pdfLabels, data, lines, subtotal, vatRate, vatAmount, grandTotal } =
    payload;
  const styles = createStyles(locale);
  const money = (n: number) => formatPdfMoney(n, locale);
  const formatQty = (n: number) =>
    new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA").format(n);

  const termsBlocks = [
    ...(data.clauseItems ?? []).map((c) => ({
      title: c.categoryLabel,
      body: c.text,
    })),
    {
      title: pdfLabels.paymentTermsTitle,
      body: labels.acceptanceText,
    },
  ];

  return (
    <Document title={data.projectName} author={data.companyName ?? "Ruwaq"}>
      <Page size="A4" style={styles.page} wrap>
        <PdfFixedHeader payload={payload} styles={styles} />
        <PdfFixedFooter payload={payload} styles={styles} />

        <Text style={styles.title}>{data.projectName}</Text>
        {data.introduction ? <Text style={styles.intro}>{data.introduction}</Text> : null}

        <View style={styles.metaRow}>
          <Text style={[styles.metaLine, { marginRight: 14 }]}>
            {labels.preparedFor} {data.clientName}
          </Text>
          <Text style={[styles.metaLine, { marginRight: 14 }]}>
            {labels.date} {data.date}
          </Text>
          {data.proposalNumber ? (
            <Text style={[styles.metaLine, { marginRight: 14 }]}>
              {labels.proposalNumber} {data.proposalNumber}
            </Text>
          ) : null}
          <Text style={styles.metaLine}>
            {labels.validity} {data.validityDate}
          </Text>
        </View>

        {data.commercialMode === "estimate_only" ? (
          <Text style={styles.estimateNote}>{labels.estimateOnly}</Text>
        ) : null}

        <View style={styles.table}>
          <View style={styles.tableHeader} wrap={false}>
            <Text style={styles.colDesc}>{pdfLabels.description}</Text>
            <Text style={styles.colQty}>{pdfLabels.qty}</Text>
            <Text style={styles.colUnit}>{pdfLabels.unitPrice}</Text>
            <Text style={styles.colTotal}>{pdfLabels.lineTotal}</Text>
          </View>
          {lines.map((line, i) => (
            <View
              key={`${line.description}-${i}`}
              style={i % 2 === 1 ? [styles.tableRow, styles.tableRowAlt] : styles.tableRow}
            >
              <Text style={styles.colDesc}>
                {line.description}
                {line.isEstimated ? ` (${labels.estimateIndicative})` : ""}
              </Text>
              <Text style={styles.colQty}>{formatQty(line.qty)}</Text>
              <Text style={styles.colUnit}>{money(line.unitPrice)}</Text>
              <Text style={styles.colTotal}>{money(line.total)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBox} wrap={false} minPresenceAhead={80}>
          <View style={styles.totalRow}>
            <Text>{money(subtotal)}</Text>
            <Text>{pdfLabels.subtotal}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>{money(vatAmount)}</Text>
            <Text>
              {pdfLabels.vat} ({Math.round(vatRate * 100)}%)
            </Text>
          </View>
          <View style={styles.grandRow}>
            <Text>{money(grandTotal)}</Text>
            <Text>{pdfLabels.grandTotal}</Text>
          </View>
        </View>

        <View break={lines.length > 12}>
          <Text style={styles.sectionTitle}>{pdfLabels.termsTitle}</Text>
          {termsBlocks.map((block, idx) => (
            <View key={`${block.title}-${idx}`} style={styles.clauseBlock}>
              <Text style={styles.clauseCategory}>{block.title}</Text>
              <Text style={styles.clauseText}>{block.body}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
