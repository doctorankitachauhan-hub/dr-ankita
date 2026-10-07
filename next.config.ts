import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Render <title>, meta description and canonical inside <head> for ALL user agents.
  // Disables streaming metadata, which otherwise places them in <body> for browsers.
  htmlLimitedBots: /.*/,
  serverExternalPackages: ["pdfkit", "cloudinary"],
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      // --- Category URL cleanup: old & / underscore slugs -> clean hyphenated slugs ---
      {
        source: "/advanced_procedures_&_surgeries/laparoscopic_&_vaginal_hysterectomy",
        destination: "/advanced-procedures-and-surgeries/laparoscopic-and-vaginal-hysterectomy",
        permanent: true,
      },
      {
        source: "/advanced_procedures_&_surgeries/laparoscopic_surgeries",
        destination: "/advanced-procedures-and-surgeries/laparoscopic-surgeries",
        permanent: true,
      },
      {
        source: "/advanced_procedures_&_surgeries/operative_hysteroscopy",
        destination: "/advanced-procedures-and-surgeries/operative-hysteroscopy",
        permanent: true,
      },
      {
        source: "/advanced_procedures_&_surgeries/perineal_repair",
        destination: "/advanced-procedures-and-surgeries/perineal-repair",
        permanent: true,
      },
      {
        source: "/gynecology_care/PCOS-management",
        destination: "/gynecology-care/pcos-management",
        permanent: true,
      },
      {
        source: "/gynecology_care/menopause_care_&_counselling",
        destination: "/gynecology-care/menopause-care-and-counselling",
        permanent: true,
      },
      {
        source: "/gynecology_care/menstrual_problems_&_irregular_periods",
        destination: "/gynecology-care/menstrual-problems-and-irregular-periods",
        permanent: true,
      },
      {
        source: "/gynecology_care/pelvic_infections_treatment",
        destination: "/gynecology-care/pelvic-infections-treatment",
        permanent: true,
      },
      {
        source: "/laser_gynecology/laser_treatment_for_stress_urinary_incontinence",
        destination: "/laser-gynecology/laser-treatment-for-stress-urinary-incontinence",
        permanent: true,
      },
      {
        source: "/laser_gynecology/vaginal_tightening_procedures",
        destination: "/laser-gynecology/vaginal-tightening-procedures",
        permanent: true,
      },
      {
        source: "/pregnancy_&_obstetric_care/antenatal_and_postnatal_care",
        destination: "/pregnancy-and-obstetric-care/antenatal-and-postnatal-care",
        permanent: true,
      },
      {
        source: "/pregnancy_&_obstetric_care/high-risk_pregnancy_management",
        destination: "/pregnancy-and-obstetric-care/high-risk-pregnancy-management",
        permanent: true,
      },
      {
        source: "/pregnancy_&_obstetric_care/normal_and_caesarean_delivery",
        destination: "/pregnancy-and-obstetric-care/normal-and-caesarean-delivery",
        permanent: true,
      },
      {
        source: "/pregnancy_&_obstetric_care/preconception_counselling_&_planning",
        destination: "/pregnancy-and-obstetric-care/preconception-counselling-and-planning",
        permanent: true,
      },

      // --- Orphaned /services/* pages that were kept, now relocated into the main taxonomy ---
      {
        source: "/services/hymenoplasty",
        destination: "/advanced-procedures-and-surgeries/hymenoplasty",
        permanent: true,
      },
      {
        source: "/services/infertility-treatment",
        destination: "/gynecology-care/infertility-treatment",
        permanent: true,
      },
      {
        source: "/services/post-delivery-rehabilitation",
        destination: "/pregnancy-and-obstetric-care/post-delivery-rehabilitation",
        permanent: true,
      },
      {
        source: "/services/prp-therapy",
        destination: "/laser-gynecology/prp-therapy-for-vaginal-dryness",
        permanent: true,
      },
      {
        source: "/services/vaginal-dryness",
        destination: "/laser-gynecology/vaginal-dryness-treatment",
        permanent: true,
      },
      {
        source: "/services/vaginoplasty",
        destination: "/advanced-procedures-and-surgeries/vaginoplasty",
        permanent: true,
      },

      // --- Orphaned /services/* pages that duplicated modern pages, merged/retired ---
      {
        source: "/services/laparoscopic-surgery",
        destination: "/advanced-procedures-and-surgeries/laparoscopic-surgeries",
        permanent: true,
      },
      {
        source: "/services/laser-vaginal-rejuvenation",
        destination: "/laser-gynecology/vaginal-tightening-procedures",
        permanent: true,
      },
      {
        source: "/services/laser-vaginal-tightening",
        destination: "/laser-gynecology/vaginal-tightening-procedures",
        permanent: true,
      },
      {
        source: "/services/pre-natal-care-and-delivery",
        destination: "/pregnancy-and-obstetric-care/antenatal-and-postnatal-care",
        permanent: true,
      },
      {
        source: "/services/pregnancy-counselling",
        destination: "/pregnancy-and-obstetric-care/preconception-counselling-and-planning",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
