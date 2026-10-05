const { PDFDocument, StandardFonts, rgb, PDFString } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function buildInteractiveCV() {
  const doc = await PDFDocument.create();

  // Document Metadata matching LaTeX hyperref
  doc.setTitle('Ritesh Kumar - Resume');
  doc.setAuthor('Ritesh Kumar');
  doc.setSubject('Resume of Ritesh Kumar - Aspiring Software Developer');
  doc.setKeywords(['Ritesh Kumar', 'Software Developer', 'Java', 'MCA', 'IIT Patna', 'Resume']);
  doc.setCreator('LaTeX with hyperref');

  // Standard A4 dimensions in points (595.28 x 841.89 pt)
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const page = doc.addPage([pageWidth, pageHeight]);

  // Embed Standard Serif Fonts
  const fontRoman = await doc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  // Margins: 0.55in (~40 pt)
  const marginX = 40;
  const contentWidth = pageWidth - marginX * 2; // 515.28 pt
  let y = pageHeight - 46;

  // Colors: linkblue = HTML #0645AD (6, 69, 173)
  const colorBlack = rgb(0.08, 0.08, 0.08);
  const colorGrey = rgb(0.3, 0.3, 0.3);
  const colorLinkBlue = rgb(6 / 255, 69 / 255, 173 / 255);

  // Helper: Add clickable link annotation to PDF page
  function addLink(url, x, yPos, textWidth, fontSize) {
    const rect = [x, yPos - 1.5, x + textWidth, yPos + fontSize + 2];
    const link = doc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: rect,
      Border: [0, 0, 0],
      A: {
        Type: 'Action',
        S: 'URI',
        URI: PDFString.of(url),
      },
    });
    const linkRef = doc.context.register(link);
    page.node.addAnnot(linkRef);
  }

  // Helper: Section title with horizontal rule
  function drawSection(title) {
    y -= 18;
    page.drawText(title, {
      x: marginX,
      y,
      size: 12,
      font: fontBold,
      color: colorBlack,
    });
    y -= 4;
    // Horizontal titlerule
    page.drawLine({
      start: { x: marginX, y },
      end: { x: pageWidth - marginX, y },
      thickness: 0.85,
      color: colorBlack,
    });
    y -= 12;
  }

  // Helper: Draw word-wrapped text with optional indent
  function drawWrappedText(text, fontSize, font, lineHeight, color = colorBlack, indent = 0) {
    const words = text.split(' ');
    let currentLine = '';
    const maxW = contentWidth - indent;

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxW && currentLine) {
        page.drawText(currentLine, {
          x: marginX + indent,
          y,
          size: fontSize,
          font,
          color,
        });
        y -= lineHeight;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      page.drawText(currentLine, {
        x: marginX + indent,
        y,
        size: fontSize,
        font,
        color,
      });
      y -= lineHeight;
    }
  }

  // ==================== HEADER ====================
  // Name
  const nameText = 'Ritesh Kumar';
  const nameSize = 25;
  const nameW = fontBold.widthOfTextAtSize(nameText, nameSize);
  page.drawText(nameText, {
    x: (pageWidth - nameW) / 2,
    y,
    size: nameSize,
    font: fontBold,
    color: colorBlack,
  });
  y -= 20;

  // Contact line: 7217845884 | ritesh.iitpatna@gmail.com | New Delhi, India
  const p1 = '7217845884   |   ';
  const emailText = 'ritesh.iitpatna@gmail.com';
  const emailUrl = 'mailto:ritesh.iitpatna@gmail.com';
  const p2 = '   |   New Delhi, India';

  const p1W = fontRoman.widthOfTextAtSize(p1, 10.8);
  const emailW = fontRoman.widthOfTextAtSize(emailText, 10.8);
  const p2W = fontRoman.widthOfTextAtSize(p2, 10.8);
  const line1TotalW = p1W + emailW + p2W;
  let curX = (pageWidth - line1TotalW) / 2;

  page.drawText(p1, { x: curX, y, size: 10.8, font: fontRoman, color: colorGrey });
  curX += p1W;

  page.drawText(emailText, { x: curX, y, size: 10.8, font: fontRoman, color: colorLinkBlue });
  addLink(emailUrl, curX, y, emailW, 10.8);
  curX += emailW;

  page.drawText(p2, { x: curX, y, size: 10.8, font: fontRoman, color: colorGrey });
  y -= 16;

  // Links line: LinkedIn | GitHub | Portfolio
  const lLinkedin = 'LinkedIn';
  const urlLinkedin = 'https://www.linkedin.com/in/ritesh-iitpatna/';

  const lGithub = 'GitHub';
  const urlGithub = 'https://github.com/ritesh-iitpatna';

  const lPortfolio = 'Portfolio';
  const urlPortfolio = 'https://portfolio-one-phi-bh3n1xdisv.vercel.app/';

  const sep = '   |   ';
  const sepW = fontRoman.widthOfTextAtSize(sep, 10.8);
  const link1W = fontRoman.widthOfTextAtSize(lLinkedin, 10.8);
  const link2W = fontRoman.widthOfTextAtSize(lGithub, 10.8);
  const link3W = fontRoman.widthOfTextAtSize(lPortfolio, 10.8);
  const line2TotalW = link1W + sepW + link2W + sepW + link3W;
  curX = (pageWidth - line2TotalW) / 2;

  // LinkedIn Link
  page.drawText(lLinkedin, { x: curX, y, size: 10.8, font: fontRoman, color: colorLinkBlue });
  addLink(urlLinkedin, curX, y, link1W, 10.8);
  curX += link1W;

  // Separator
  page.drawText(sep, { x: curX, y, size: 10.8, font: fontRoman, color: colorGrey });
  curX += sepW;

  // GitHub Link
  page.drawText(lGithub, { x: curX, y, size: 10.8, font: fontRoman, color: colorLinkBlue });
  addLink(urlGithub, curX, y, link2W, 10.8);
  curX += link2W;

  // Separator
  page.drawText(sep, { x: curX, y, size: 10.8, font: fontRoman, color: colorGrey });
  curX += sepW;

  // Portfolio Link
  page.drawText(lPortfolio, { x: curX, y, size: 10.8, font: fontRoman, color: colorLinkBlue });
  addLink(urlPortfolio, curX, y, link3W, 10.8);
  y -= 8;

  // ==================== SUMMARY ====================
  drawSection('SUMMARY');
  const summary =
    'Aspiring Software Developer pursuing an MCA at IIT Patna, with a strong foundation in Core Java, Data Structures & Algorithms, OOP, JDBC, and MySQL. Interested in backend development, problem-solving, and building clean, efficient, and maintainable software applications.';
  drawWrappedText(summary, 10.2, fontRoman, 14.5, colorBlack);

  // ==================== TECHNICAL SKILLS ====================
  drawSection('TECHNICAL SKILLS');
  const skillsList = [
    { label: 'Programming:', val: 'Java, Python (Basics), MySQL' },
    { label: 'Core Concepts:', val: 'Data Structures & Algorithms, OOP, Exception Handling, Java Collections Framework' },
    { label: 'Java Technologies:', val: 'JDBC, Java Swing, Java AWT' },
    { label: 'Web Technologies:', val: 'HTML, Next.js, React, TypeScript, Tailwind CSS' },
    { label: 'Tools:', val: 'Eclipse, IntelliJ IDEA, Visual Studio Code, Android Studio, MySQL Workbench, Git, GitHub' },
    { label: 'Currently Learning:', val: 'Kotlin' },
    { label: 'Soft Skills:', val: 'Problem Solving, Logic Building, Quick Learning, Team Collaboration, Communication' },
    { label: 'Languages:', val: 'English, Hindi' },
  ];

  for (const s of skillsList) {
    page.drawText(s.label, {
      x: marginX,
      y,
      size: 10.2,
      font: fontBold,
      color: colorBlack,
    });
    page.drawText(s.val, {
      x: marginX + 122,
      y,
      size: 10.2,
      font: fontRoman,
      color: colorBlack,
    });
    y -= 14.8;
  }

  // ==================== PROJECTS ====================
  drawSection('PROJECTS');

  // --- Project 1: Bank Management System (ATM Simulation) ---
  const p1Title = 'Bank Management System (ATM Simulation) ';
  const p1LinkText = '[GitHub]';
  const p1Date = 'Mar 2026 – May 2026';
  const p1Url = 'https://github.com/riteshkumar999097-afk/bank-management-system';

  page.drawText(p1Title, {
    x: marginX,
    y,
    size: 11,
    font: fontBold,
    color: colorBlack,
  });
  const p1TitleW = fontBold.widthOfTextAtSize(p1Title, 11);

  page.drawText(p1LinkText, {
    x: marginX + p1TitleW,
    y,
    size: 10,
    font: fontRoman,
    color: colorLinkBlue,
  });
  const p1LinkW = fontRoman.widthOfTextAtSize(p1LinkText, 10);
  addLink(p1Url, marginX + p1TitleW, y, p1LinkW, 10);

  const p1DateW = fontItalic.widthOfTextAtSize(p1Date, 10.2);
  page.drawText(p1Date, {
    x: pageWidth - marginX - p1DateW,
    y,
    size: 10.2,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 14;

  const proj1Bullets = [
    'Developed a desktop banking application using Java Swing, AWT, JDBC, and MySQL, supporting login, deposits, withdrawals, fast cash, balance enquiry, PIN change, and mini statements.',
    'Implemented input validation, exception handling, and database operations to manage customer and transaction data.',
    'Used Git and GitHub for source-code management and version control.',
  ];

  for (const b of proj1Bullets) {
    page.drawText('•', { x: marginX + 4, y, size: 10, font: fontRoman, color: colorBlack });
    drawWrappedText(b, 10, fontRoman, 14, colorBlack, 15);
    y -= 2;
  }

  y -= 6;

  // --- Project 2: Personal Developer Portfolio ---
  const p2Title = 'Personal Developer Portfolio ';
  const p2LinkText = '[Live Demo]';
  const p2Date = '2026';
  const p2Url = 'https://portfolio-one-phi-bh3n1xdisv.vercel.app/';

  page.drawText(p2Title, {
    x: marginX,
    y,
    size: 11,
    font: fontBold,
    color: colorBlack,
  });
  const p2TitleW = fontBold.widthOfTextAtSize(p2Title, 11);

  page.drawText(p2LinkText, {
    x: marginX + p2TitleW,
    y,
    size: 10,
    font: fontRoman,
    color: colorLinkBlue,
  });
  const p2LinkW = fontRoman.widthOfTextAtSize(p2LinkText, 10);
  addLink(p2Url, marginX + p2TitleW, y, p2LinkW, 10);

  const p2DateW = fontItalic.widthOfTextAtSize(p2Date, 10.2);
  page.drawText(p2Date, {
    x: pageWidth - marginX - p2DateW,
    y,
    size: 10.2,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 14;

  const proj2Bullets = [
    'Built a responsive personal portfolio using Next.js, React, TypeScript, and Tailwind CSS, showcasing projects, technical skills, and academic background.',
    'Created an interactive cinematic intro and responsive animations using Framer Motion, with dark/light themes, glassmorphism UI, Web Audio API, and interactive browser features.',
    'Leveraged AI-assisted development tools throughout the project for implementation, debugging, UI/UX refinement, and problem-solving.',
  ];

  for (const b of proj2Bullets) {
    page.drawText('•', { x: marginX + 4, y, size: 10, font: fontRoman, color: colorBlack });
    drawWrappedText(b, 10, fontRoman, 14, colorBlack, 15);
    y -= 2;
  }

  // ==================== EDUCATION ====================
  drawSection('EDUCATION');

  // Master of Computer Applications (MCA)
  page.drawText('Master of Computer Applications (MCA)', {
    x: marginX,
    y,
    size: 11,
    font: fontBold,
    color: colorBlack,
  });
  const edu1Date = 'Present';
  const edu1DateW = fontItalic.widthOfTextAtSize(edu1Date, 10.2);
  page.drawText(edu1Date, {
    x: pageWidth - marginX - edu1DateW,
    y,
    size: 10.2,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 13.5;

  page.drawText('IIT Patna', {
    x: marginX,
    y,
    size: 10.2,
    font: fontRoman,
    color: colorBlack,
  });
  const edu1Loc = 'Patna, India';
  const edu1LocW = fontRoman.widthOfTextAtSize(edu1Loc, 10.2);
  page.drawText(edu1Loc, {
    x: pageWidth - marginX - edu1LocW,
    y,
    size: 10.2,
    font: fontRoman,
    color: colorGrey,
  });
  y -= 15.5;

  // B.Sc. in Physical Science with Electronics
  page.drawText('B.Sc. in Physical Science with Electronics', {
    x: marginX,
    y,
    size: 11,
    font: fontBold,
    color: colorBlack,
  });
  const edu2Date = 'Aug 2025';
  const edu2DateW = fontItalic.widthOfTextAtSize(edu2Date, 10.2);
  page.drawText(edu2Date, {
    x: pageWidth - marginX - edu2DateW,
    y,
    size: 10.2,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 13.5;

  page.drawText('University of Delhi', {
    x: marginX,
    y,
    size: 10.2,
    font: fontRoman,
    color: colorBlack,
  });
  const edu2Loc = 'Delhi, India';
  const edu2LocW = fontRoman.widthOfTextAtSize(edu2Loc, 10.2);
  page.drawText(edu2Loc, {
    x: pageWidth - marginX - edu2LocW,
    y,
    size: 10.2,
    font: fontRoman,
    color: colorGrey,
  });
  y -= 14;

  const eduBullets = [
    'Built a foundation in Mathematics, Electronics, Microprocessors, and Modern Physics.',
    'Maintained a CGPA above 8.0 in three consecutive semesters during undergraduate studies.',
  ];

  for (const b of eduBullets) {
    page.drawText('•', { x: marginX + 4, y, size: 10, font: fontRoman, color: colorBlack });
    drawWrappedText(b, 10, fontRoman, 14, colorBlack, 15);
    y -= 2;
  }

  // ==================== AWARDS & ACHIEVEMENTS ====================
  drawSection('AWARDS & ACHIEVEMENTS');

  // Gold Medal & Student of the Year Award
  page.drawText('Gold Medal & Student of the Year Award', {
    x: marginX,
    y,
    size: 11,
    font: fontBold,
    color: colorBlack,
  });
  const aw1Date = 'May 2019';
  const aw1DateW = fontItalic.widthOfTextAtSize(aw1Date, 10.2);
  page.drawText(aw1Date, {
    x: pageWidth - marginX - aw1DateW,
    y,
    size: 10.2,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 13.5;

  page.drawText('•', { x: marginX + 4, y, size: 10, font: fontRoman, color: colorBlack });
  drawWrappedText(
    'Secured First Rank in Class XI and received the Gold Medal and Student of the Year Award.',
    10,
    fontRoman,
    14,
    colorBlack,
    15
  );
  y -= 5;

  // Mental Mathematics Quiz
  page.drawText('Mental Mathematics Quiz – 2nd Position', {
    x: marginX,
    y,
    size: 11,
    font: fontBold,
    color: colorBlack,
  });
  const aw2Date = 'Oct 2016';
  const aw2DateW = fontItalic.widthOfTextAtSize(aw2Date, 10.2);
  page.drawText(aw2Date, {
    x: pageWidth - marginX - aw2DateW,
    y,
    size: 10.2,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 13.5;

  page.drawText('•', { x: marginX + 4, y, size: 10, font: fontRoman, color: colorBlack });
  drawWrappedText(
    'Secured 2nd Position in a school-level mental mathematics competition involving students from multiple schools.',
    10,
    fontRoman,
    14,
    colorBlack,
    15
  );

  console.log('Ending Y coordinate on page:', y, 'out of pageHeight:', pageHeight);
  const pdfBytes = await doc.save();
  const destPath = path.resolve(__dirname, '../public/Ritesh_Kumar_Resume.pdf');
  fs.writeFileSync(destPath, pdfBytes);
  console.log('Successfully compiled and saved interactive CV with balanced layout to:', destPath);
}

buildInteractiveCV().catch(err => {
  console.error('Error generating CV:', err);
  process.exit(1);
});
