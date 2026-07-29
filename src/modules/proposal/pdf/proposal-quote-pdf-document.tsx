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

const navy = "#0f2c59";
const gold = "#c9a227";
const muted = "#5c6470";

const styles = StyleSheet.create({
  page: {
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 10,
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 40,
    color: "#1a1a1a",
    lineHeight: 1.45,
  },
  headerRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e4dc",
    paddingBottom: 14,
  },
  headerMeta: {
    flex: 1,
    textAlign: "right",
  },
  companyName: {
    fontSize: 16,
    fontWeight: 700,
    color: navy,
    marginBottom: 4,
  },
  metaLine: {
    fontSize: 9,
    color: muted,
    textAlign: "right",
    marginBottom: 2,
  },
  logo: {
    width: 72,
    height: 72,
    objectFit: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: 700,
    color: navy,
    textAlign: "right",
    marginBottom: 8,
  },
  intro: {
    fontSize: 10,
    color: muted,
    textAlign: "right",
    marginBottom: 16,
  },
  table: {
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0ddd4",
  },
  tableHeader: {
    flexDirection: "row-reverse",
    backgroundColor: navy,
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontWeight: 700,
    fontSize: 9,
  },
  tableRow: {
    flexDirection: "row-reverse",
    borderBottomWidth: 1,
    borderBottomColor: "#eceae4",
    paddingVertical: 7,
    paddingHorizontal: 6,
    fontSize: 9,
  },
  tableRowAlt: {
    backgroundColor: "#faf9f6",
  },
  colDesc: { width: "40%", textAlign: "right" },
  colQty: { width: "12%", textAlign: "center" },
  colUnit: { width: "24%", textAlign: "left" },
  colTotal: { width: "24%", textAlign: "left", fontWeight: 700 },
  totalsBox: {
    marginTop: 4,
    marginLeft: "auto",
    width: "48%",
    borderWidth: 1,
    borderColor: "#e0ddd4",
    padding: 10,
  },
  totalRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 9,
  },
  grandRow: {
    flexDirection: "row-reverse",
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
    textAlign: "right",
    marginTop: 14,
    marginBottom: 6,
  },
  clauseBlock: {
    marginBottom: 8,
    textAlign: "right",
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
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    fontSize: 8,
    color: muted,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  estimateNote: {
    fontSize: 8,
    color: "#92400e",
    textAlign: "right",
    marginBottom: 8,
  },
});

type Props = {
  payload: QuotePdfPayload;
};

export function ProposalQuotePdfDocument({ payload }: Props) {
  const { locale, labels, pdfLabels, data, lines, subtotal, vatRate, vatAmount, grandTotal, logoSrc } =
    payload;
  const money = (n: number) => formatPdfMoney(n, locale);

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
        <View style={styles.headerRow}>
          <View style={styles.headerMeta}>
            <Text style={styles.companyName}>{data.companyName ?? labels.logoPlaceholder}</Text>
            {data.crNumber ? (
              <Text style={styles.metaLine}>
                {labels.crNumber} {data.crNumber}
              </Text>
            ) : null}
            {data.vatNumber ? (
              <Text style={styles.metaLine}>
                {labels.vatNumber} {data.vatNumber}
              </Text>
            ) : null}
            {data.address ? <Text style={styles.metaLine}>{data.address}</Text> : null}
            {data.companyPhone ? (
              <Text style={styles.metaLine}>
                {labels.phone} {data.companyPhone}
              </Text>
            ) : null}
            {data.companyEmail ? (
              <Text style={styles.metaLine}>
                {labels.email} {data.companyEmail}
              </Text>
            ) : null}
          </View>
          {logoSrc ? <Image src={logoSrc} style={styles.logo} /> : null}
        </View>

        <Text style={styles.title}>{data.projectName}</Text>
        {data.introduction ? <Text style={styles.intro}>{data.introduction}</Text> : null}

        <View style={{ flexDirection: "row-reverse", flexWrap: "wrap", marginBottom: 12 }}>
          <Text style={[styles.metaLine, { marginLeft: 14 }]}>
            {labels.preparedFor} {data.clientName}
          </Text>
          <Text style={[styles.metaLine, { marginLeft: 14 }]}>
            {labels.date} {data.date}
          </Text>
          {data.proposalNumber ? (
            <Text style={[styles.metaLine, { marginLeft: 14 }]}>
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
          <View style={styles.tableHeader}>
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
              <Text style={styles.colQty}>{line.qty}</Text>
              <Text style={styles.colUnit}>{money(line.unitPrice)}</Text>
              <Text style={styles.colTotal}>{money(line.total)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsBox}>
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

        <Text style={styles.sectionTitle}>{pdfLabels.termsTitle}</Text>
        {termsBlocks.map((block, idx) => (
          <View key={`${block.title}-${idx}`} style={styles.clauseBlock}>
            <Text style={styles.clauseCategory}>{block.title}</Text>
            <Text style={styles.clauseText}>{block.body}</Text>
          </View>
        ))}

        <Text style={styles.footer}>{labels.footer}</Text>
      </Page>
    </Document>
  );
}
