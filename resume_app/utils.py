from docx import Document

def extract_docx(file_path):
    """Extract text from a DOCX file."""
    doc = Document(file_path)
    text = []
    for para in doc.paragraphs:
        text.append(para.text)
    return '\n'.join(text)
