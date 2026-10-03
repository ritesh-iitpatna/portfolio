const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function buildCV() {
  const doc = await PDFDocument.create();
  // Standard A4 dimensions in points
  const page = doc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const fontRoman = await doc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await doc.embedFont(StandardFonts.TimesRomanBold);
  const fontItalic = await doc.embedFont(StandardFonts.TimesRomanItalic);

  const marginX = 46;
  const contentWidth = width - marginX * 2;
  let y = height - 42;

  const colorBlack = rgb(0.1, 0.1, 0.1);
  const colorGrey = rgb(0.35, 0.35, 0.35);
  const colorLink = rgb(0.05, 0.35, 0.75);

  // Helper: Draw Section Header with horizontal rule
  function drawSectionHeader(title) {
    y -= 14;
    page.drawText(title, {
      x: marginX,
      y,
      size: 11.5,
      font: fontBold,
      color: colorBlack,
    });
    y -= 3;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.75,
      color: colorBlack,
    });
    y -= 10;
  }

  // Helper: text wrapping
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

  // --- HEADER ---
  const name = 'Ritesh Kumar';
  const nameWidth = fontBold.widthOfTextAtSize(name, 22);
  page.drawText(name, {
    x: (width - nameWidth) / 2,
    y,
    size: 22,
    font: fontBold,
    color: colorBlack,
  });
  y -= 16;

  const contactLine = '7217845884   |   ritesh.iitpatna@gmail.com   |   New Delhi, India';
  const contactWidth = fontRoman.widthOfTextAtSize(contactLine, 9.5);
  page.drawText(contactLine, {
    x: (width - contactWidth) / 2,
    y,
    size: 9.5,
    font: fontRoman,
    color: colorGrey,
  });
  y -= 13;

  const linksLine = 'LinkedIn   |   GitHub   |   Portfolio';
  const linksWidth = fontRoman.widthOfTextAtSize(linksLine, 9.5);
  page.drawText(linksLine, {
    x: (width - linksWidth) / 2,
    y,
    size: 9.5,
    font: fontRoman,
    color: colorLink,
  });
  y -= 6;

  // --- SUMMARY ---
  drawSectionHeader('SUMMARY');
  const summaryText =
    'Aspiring Software Developer pursuing an MCA at IIT Patna, with a strong foundation in Core Java, Data Structures & Algorithms, OOP, JDBC, and MySQL. Interested in backend development, problem-solving, and building clean, efficient, and maintainable software applications.';
  drawWrappedText(summaryText, 9.5, fontRoman, 12.5, colorBlack);

  // --- TECHNICAL SKILLS ---
  drawSectionHeader('TECHNICAL SKILLS');
  const skills = [
    { label: 'Programming:', val: 'Java, Python (Basics), MySQL' },
    { label: 'Core Concepts:', val: 'Data Structures & Algorithms, OOP, Exception Handling, Java Collections Framework' },
    { label: 'Java Technologies:', val: 'JDBC, Java Swing, Java AWT' },
    { label: 'Web Technologies:', val: 'HTML, Next.js, React, TypeScript, Tailwind CSS' },
    { label: 'Tools:', val: 'Eclipse, IntelliJ IDEA, Visual Studio Code, Android Studio, MySQL Workbench, Git, GitHub' },
    { label: 'Currently Learning:', val: 'Kotlin' },
    { label: 'Soft Skills:', val: 'Problem Solving, Logic Building, Quick Learning, Team Collaboration, Communication' },
    { label: 'Languages:', val: 'English, Hindi' },
  ];

  for (const s of skills) {
    page.drawText(s.label, {
      x: marginX,
      y,
      size: 9,
      font: fontBold,
      color: colorBlack,
    });
    page.drawText(s.val, {
      x: marginX + 115,
      y,
      size: 9,
      font: fontRoman,
      color: colorBlack,
    });
    y -= 12.2;
  }

  // --- PROJECTS ---
  drawSectionHeader('PROJECTS');

  // Project 1: Bank Management System
  page.drawText('Bank Management System (ATM Simulation)', {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  const proj1Date = 'Mar 2026 – May 2026';
  page.drawText(proj1Date, {
    x: width - marginX - fontItalic.widthOfTextAtSize(proj1Date, 9),
    y,
    size: 9,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 11.5;

  page.drawText('[GitHub]', {
    x: marginX,
    y,
    size: 8.5,
    font: fontRoman,
    color: colorLink,
  });
  y -= 11;

  const proj1Bullets = [
    'Developed a desktop banking application using Java Swing, AWT, JDBC, and MySQL, supporting login, deposits, withdrawals, fast cash, balance enquiry, PIN change, and mini statements.',
    'Implemented input validation, exception handling, and database operations to manage customer and transaction data.',
    'Used Git and GitHub for source-code management and version control.',
  ];

  for (const bullet of proj1Bullets) {
    page.drawText('•', { x: marginX + 4, y, size: 8.5, font: fontRoman, color: colorBlack });
    drawWrappedText(bullet, 8.8, fontRoman, 11.5, colorBlack, 14);
    y -= 1;
  }

  // Project 2: Personal Developer Portfolio
  y -= 3;
  page.drawText('Personal Developer Portfolio', {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  const proj2Date = '2026';
  page.drawText(proj2Date, {
    x: width - marginX - fontItalic.widthOfTextAtSize(proj2Date, 9),
    y,
    size: 9,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 11.5;

  page.drawText('[Live Demo]', {
    x: marginX,
    y,
    size: 8.5,
    font: fontRoman,
    color: colorLink,
  });
  y -= 11;

  const proj2Bullets = [
    'Built a responsive personal portfolio using Next.js, React, TypeScript, and Tailwind CSS, showcasing projects, technical skills, and academic background.',
    'Created an interactive cinematic intro and responsive animations using Framer Motion, with dark/light themes, glassmorphism UI, Web Audio API, and interactive browser features.',
    'Leveraged AI-assisted development tools throughout the project for implementation, debugging, UI/UX refinement, and problem-solving.',
  ];

  for (const bullet of proj2Bullets) {
    page.drawText('•', { x: marginX + 4, y, size: 8.5, font: fontRoman, color: colorBlack });
    drawWrappedText(bullet, 8.8, fontRoman, 11.5, colorBlack, 14);
    y -= 1;
  }

  // --- EDUCATION ---
  drawSectionHeader('EDUCATION');

  // Degree 1
  page.drawText('Master of Computer Applications (MCA)', {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  const edu1Date = 'Present';
  page.drawText(edu1Date, {
    x: width - marginX - fontItalic.widthOfTextAtSize(edu1Date, 9),
    y,
    size: 9,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 11.5;

  page.drawText('IIT Patna', {
    x: marginX,
    y,
    size: 9,
    font: fontRoman,
    color: colorBlack,
  });
  const edu1Loc = 'Patna, India';
  page.drawText(edu1Loc, {
    x: width - marginX - fontRoman.widthOfTextAtSize(edu1Loc, 9),
    y,
    size: 9,
    font: fontRoman,
    color: colorGrey,
  });
  y -= 13;

  // Degree 2
  page.drawText('B.Sc. in Physical Science with Electronics', {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  const edu2Date = 'Aug 2025';
  page.drawText(edu2Date, {
    x: width - marginX - fontItalic.widthOfTextAtSize(edu2Date, 9),
    y,
    size: 9,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 11.5;

  page.drawText('University of Delhi', {
    x: marginX,
    y,
    size: 9,
    font: fontRoman,
    color: colorBlack,
  });
  const edu2Loc = 'Delhi, India';
  page.drawText(edu2Loc, {
    x: width - marginX - fontRoman.widthOfTextAtSize(edu2Loc, 9),
    y,
    size: 9,
    font: fontRoman,
    color: colorGrey,
  });
  y -= 11.5;

  const eduBullets = [
    'Built a foundation in Mathematics, Electronics, Microprocessors, and Modern Physics.',
    'Maintained a CGPA above 8.0 in three consecutive semesters during undergraduate studies.',
  ];

  for (const bullet of eduBullets) {
    page.drawText('•', { x: marginX + 4, y, size: 8.5, font: fontRoman, color: colorBlack });
    drawWrappedText(bullet, 8.8, fontRoman, 11.5, colorBlack, 14);
    y -= 1;
  }

  // --- AWARDS & ACHIEVEMENTS ---
  drawSectionHeader('AWARDS & ACHIEVEMENTS');

  // Award 1
  page.drawText('Gold Medal & Student of the Year Award', {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  const aw1Date = 'May 2019';
  page.drawText(aw1Date, {
    x: width - marginX - fontItalic.widthOfTextAtSize(aw1Date, 9),
    y,
    size: 9,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 11.5;

  page.drawText('•', { x: marginX + 4, y, size: 8.5, font: fontRoman, color: colorBlack });
  drawWrappedText(
    'Secured First Rank in Class XI and received the Gold Medal and Student of the Year Award.',
    8.8,
    fontRoman,
    11.5,
    colorBlack,
    14
  );
  y -= 4;

  // Award 2
  page.drawText('Mental Mathematics Quiz – 2nd Position', {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: colorBlack,
  });
  const aw2Date = 'Oct 2016';
  page.drawText(aw2Date, {
    x: width - marginX - fontItalic.widthOfTextAtSize(aw2Date, 9),
    y,
    size: 9,
    font: fontItalic,
    color: colorGrey,
  });
  y -= 11.5;

  page.drawText('•', { x: marginX + 4, y, size: 8.5, font: fontRoman, color: colorBlack });
  drawWrappedText(
    'Secured 2nd Position in a school-level mental mathematics competition involving students from multiple schools.',
    8.8,
    fontRoman,
    11.5,
    colorBlack,
    14
  );

  // Footer page number
  const pageNum = '1';
  page.drawText(pageNum, {
    x: (width - fontRoman.widthOfTextAtSize(pageNum, 9)) / 2,
    y: 22,
    size: 9,
    font: fontRoman,
    color: colorGrey,
  });

  const pdfBytes = await doc.save();
  const destPath = path.resolve(__dirname, '../public/Ritesh_Kumar_Resume.pdf');
  fs.writeFileSync(destPath, pdfBytes);
  console.log('Successfully generated Ritesh_Kumar_Resume.pdf at', destPath);
}

buildCV().catch(err => {
  console.error('Error generating CV:', err);
  process.exit(1);
});
