"""
Markdown to PDF Converter Script
Converts all .md files in the current directory and subdirectories to PDF.
Original .md files are preserved alongside the generated .pdf files.

Uses markdown and reportlab for reliable PDF generation with Unicode support.
"""

import subprocess
import sys
from pathlib import Path
import re


def install_requirements():
    """Install required packages if not already installed."""
    packages = [("markdown", "markdown"), ("reportlab", "reportlab")]
    for import_name, package_name in packages:
        try:
            __import__(import_name)
        except ImportError:
            print(f"Installing {package_name}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package_name])


def convert_md_to_pdf(md_file_path: Path, output_dir: Path = None):
    """
    Convert a single Markdown file to PDF using ReportLab.
    """
    import markdown
    from html.parser import HTMLParser
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Preformatted, Table, TableStyle
    from reportlab.lib import colors
    from reportlab.lib.enums import TA_LEFT
    
    class MarkdownPDFConverter(HTMLParser):
        """HTML parser that converts markdown-generated HTML to PDF elements."""
        
        def __init__(self, styles):
            super().__init__()
            self.styles = styles
            self.elements = []
            self.text_buffer = ""
            self.current_tag = None
            self.in_pre = False
            self.in_code = False
            self.in_table = False
            self.in_th = False
            self.in_td = False
            self.in_li = False
            self.list_depth = 0
            self.table_data = []
            self.current_row = []
            self.current_cell = ""
            self.pre_buffer = ""
        
        def get_style_for_tag(self, tag):
            """Get the appropriate style for an HTML tag."""
            style_map = {
                'h1': self.styles['Heading1'],
                'h2': self.styles['Heading2'],
                'h3': self.styles['Heading3'],
                'h4': self.styles['Heading4'],
                'p': self.styles['Normal'],
                'li': self.styles['Normal'],
            }
            return style_map.get(tag, self.styles['Normal'])
        
        def handle_starttag(self, tag, attrs):
            if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'):
                self.flush_text()
                self.current_tag = tag
            elif tag == 'strong' or tag == 'b':
                self.text_buffer += '<b>'
            elif tag == 'em' or tag == 'i':
                self.text_buffer += '<i>'
            elif tag == 'code':
                if not self.in_pre:
                    self.in_code = True
                    self.text_buffer += '<font face="Courier" size="9">'
            elif tag == 'pre':
                self.flush_text()
                self.in_pre = True
                self.pre_buffer = ""
            elif tag == 'table':
                self.flush_text()
                self.in_table = True
                self.table_data = []
            elif tag == 'tr':
                self.current_row = []
            elif tag == 'th':
                self.in_th = True
                self.current_cell = ""
            elif tag == 'td':
                self.in_td = True
                self.current_cell = ""
            elif tag == 'ul' or tag == 'ol':
                self.flush_text()
                self.list_depth += 1
            elif tag == 'li':
                self.flush_text()
                self.in_li = True
                self.current_tag = 'li'
            elif tag == 'br':
                if self.in_th or self.in_td:
                    self.current_cell += " | "
                else:
                    self.text_buffer += '<br/>'
            elif tag == 'hr':
                self.flush_text()
                self.elements.append(Spacer(1, 0.2 * inch))
            elif tag == 'a':
                attrs_dict = dict(attrs)
                href = attrs_dict.get('href', '')
                self.text_buffer += f'<a href="{href}" color="blue">'
        
        def handle_endtag(self, tag):
            if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'):
                self.flush_text()
                self.elements.append(Spacer(1, 0.1 * inch))
            elif tag == 'strong' or tag == 'b':
                self.text_buffer += '</b>'
            elif tag == 'em' or tag == 'i':
                self.text_buffer += '</i>'
            elif tag == 'code':
                if not self.in_pre:
                    self.in_code = False
                    self.text_buffer += '</font>'
            elif tag == 'pre':
                self.flush_pre()
                self.in_pre = False
            elif tag == 'table':
                self.render_table()
                self.in_table = False
            elif tag == 'tr':
                if self.current_row:
                    self.table_data.append(self.current_row)
            elif tag == 'th':
                self.current_row.append(('th', self.clean_text(self.current_cell.strip())))
                self.in_th = False
                self.current_cell = ""
            elif tag == 'td':
                self.current_row.append(('td', self.clean_text(self.current_cell.strip())))
                self.in_td = False
                self.current_cell = ""
            elif tag == 'ul' or tag == 'ol':
                self.list_depth -= 1
            elif tag == 'li':
                self.flush_text()
                self.in_li = False
            elif tag == 'a':
                self.text_buffer += '</a>'
        
        def handle_data(self, data):
            if self.in_pre:
                self.pre_buffer += data
            elif self.in_th or self.in_td:
                self.current_cell += data
            elif self.in_table:
                pass  # Ignore text outside cells
            else:
                self.text_buffer += data
        
        def clean_text(self, text):
            """Clean text for PDF output."""
            # Replace problematic characters
            replacements = {
                '✅': '[OK]', '❌': '[X]', '⚠️': '[!]',
                '🔍': '[?]', '🧪': '[T]', '🔒': '[L]',
                '🏗️': '[B]', '📦': '*', '📂': '*',
                '📄': '*', '📊': '*', '🔄': '*',
                '✨': '*', '🚀': '*', '📁': '*',
                '🐍': '*', '⚛️': '*', '🎭': '*',
                '🛠️': '*', '💾': '*', '📋': '*',
                '🌐': '*', '⬇️': 'v', '⬆️': '^',
                '➡️': '->', '⬅️': '<-', '▶': '>',
                '▼': 'v', '▲': '^', '◀': '<',
                '┌': '+', '┐': '+', '└': '+', '┘': '+',
                '├': '+', '┤': '+', '┬': '+', '┴': '+',
                '┼': '+', '─': '-', '│': '|',
                '—': '-', '–': '-',
                '"': '"', '"': '"',
                ''': "'", ''': "'",
                '…': '...',
                '•': '*',
            }
            for old, new in replacements.items():
                text = text.replace(old, new)
            # Remove any remaining problematic characters
            text = text.encode('latin-1', errors='replace').decode('latin-1')
            return text
        
        def flush_text(self):
            if not self.text_buffer.strip():
                self.text_buffer = ""
                return
            
            text = re.sub(r'\s+', ' ', self.text_buffer).strip()
            text = self.clean_text(text)
            self.text_buffer = ""
            
            if not text:
                return
            
            # Add bullet for list items
            if self.in_li:
                indent = "&nbsp;&nbsp;" * self.list_depth
                text = f"{indent}* {text}"
            
            style = self.get_style_for_tag(self.current_tag)
            
            try:
                para = Paragraph(text, style)
                self.elements.append(para)
            except Exception:
                # Fallback: strip all XML-like tags and try again
                clean = re.sub(r'<[^>]+>', '', text)
                try:
                    para = Paragraph(clean, self.styles['Normal'])
                    self.elements.append(para)
                except Exception:
                    pass  # Skip problematic content
        
        def flush_pre(self):
            if not self.pre_buffer.strip():
                self.pre_buffer = ""
                return
            
            text = self.clean_text(self.pre_buffer)
            self.pre_buffer = ""
            
            # Truncate very long lines
            lines = text.split('\n')
            processed_lines = []
            for line in lines:
                if len(line) > 90:
                    line = line[:87] + "..."
                processed_lines.append(line)
            text = '\n'.join(processed_lines)
            
            try:
                pre = Preformatted(text, self.styles['CodeBlock'])
                self.elements.append(pre)
                self.elements.append(Spacer(1, 0.1 * inch))
            except Exception:
                pass
        
        def render_table(self):
            if not self.table_data:
                return
            
            # Convert table data to simple list
            table_list = []
            for row in self.table_data:
                row_data = []
                for cell_type, cell_text in row:
                    # Truncate long cells
                    if len(cell_text) > 40:
                        cell_text = cell_text[:37] + "..."
                    row_data.append(cell_text)
                table_list.append(row_data)
            
            if not table_list:
                return
            
            try:
                # Create table with auto column widths
                num_cols = max(len(row) for row in table_list)
                col_width = 450 / num_cols  # Approximate page width
                
                t = Table(table_list, colWidths=[col_width] * num_cols)
                
                # Style the table
                style = TableStyle([
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3498db')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, -1), 8),
                    ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
                    ('TOPPADDING', (0, 0), (-1, -1), 6),
                    ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
                    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f9f9f9')]),
                ])
                t.setStyle(style)
                
                self.elements.append(Spacer(1, 0.1 * inch))
                self.elements.append(t)
                self.elements.append(Spacer(1, 0.1 * inch))
            except Exception:
                pass  # Skip problematic tables
    
    # Read the markdown content
    with open(md_file_path, "r", encoding="utf-8") as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(
        md_content,
        extensions=[
            "tables",
            "fenced_code",
            "toc",
            "sane_lists",
        ]
    )
    
    # Set up PDF styles
    styles = getSampleStyleSheet()
    
    # Add custom code style (use different name to avoid conflict)
    styles.add(ParagraphStyle(
        name='CodeBlock',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10,
        backColor=colors.HexColor('#f8f8f8'),
        leftIndent=10,
        rightIndent=10,
    ))
    
    # Modify existing styles
    styles['Heading1'].fontSize = 18
    styles['Heading1'].textColor = colors.HexColor('#2c3e50')
    styles['Heading1'].spaceAfter = 12
    
    styles['Heading2'].fontSize = 15
    styles['Heading2'].textColor = colors.HexColor('#34495e')
    styles['Heading2'].spaceAfter = 10
    
    styles['Heading3'].fontSize = 13
    styles['Heading3'].textColor = colors.HexColor('#7f8c8d')
    styles['Heading3'].spaceAfter = 8
    
    styles['Normal'].fontSize = 10
    styles['Normal'].leading = 14
    
    # Determine output path
    if output_dir:
        output_dir.mkdir(parents=True, exist_ok=True)
        pdf_path = output_dir / f"{md_file_path.stem}.pdf"
    else:
        pdf_path = md_file_path.with_suffix(".pdf")
    
    # Create PDF document
    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=A4,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50,
    )
    
    # Parse HTML and build elements
    converter = MarkdownPDFConverter(styles)
    converter.feed(html_content)
    converter.flush_text()
    
    # Build PDF
    if converter.elements:
        doc.build(converter.elements)
    else:
        # Create empty PDF with message
        doc.build([Paragraph("No content to display", styles['Normal'])])
    
    return pdf_path


def find_all_md_files(root_dir: Path) -> list:
    """Find all Markdown files in the directory tree."""
    md_files = []
    for path in root_dir.rglob("*.md"):
        if not any(part.startswith(".") for part in path.parts):
            md_files.append(path)
    return md_files


def main():
    """Main function to convert all MD files to PDF."""
    print("=" * 60)
    print("Markdown to PDF Converter")
    print("=" * 60)
    
    print("\n[*] Checking and installing required packages...")
    install_requirements()
    
    script_dir = Path(__file__).parent.resolve()
    
    print(f"\n[*] Scanning for Markdown files in: {script_dir}")
    
    md_files = find_all_md_files(script_dir)
    
    if not md_files:
        print("[X] No Markdown files found!")
        return
    
    print(f"\n[*] Found {len(md_files)} Markdown file(s):\n")
    for md_file in md_files:
        relative_path = md_file.relative_to(script_dir)
        print(f"   - {relative_path}")
    
    print("\n" + "-" * 60)
    print("[*] Converting files...\n")
    
    success_count = 0
    error_count = 0
    
    for md_file in md_files:
        relative_path = md_file.relative_to(script_dir)
        try:
            pdf_path = convert_md_to_pdf(md_file)
            print(f"   [OK] {relative_path} -> {pdf_path.name}")
            success_count += 1
        except Exception as e:
            print(f"   [X] {relative_path} - Error: {str(e)}")
            error_count += 1
    
    print("\n" + "=" * 60)
    print(f"[*] Conversion Summary:")
    print(f"   [OK] Successfully converted: {success_count}")
    print(f"   [X] Failed: {error_count}")
    print(f"   [*] Total files processed: {len(md_files)}")
    print("=" * 60)
    
    if success_count > 0:
        print("\n[*] PDF files have been created next to the original MD files.")
        print("    Both .md and .pdf files are preserved.")


if __name__ == "__main__":
    main()
