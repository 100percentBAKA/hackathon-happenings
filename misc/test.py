from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader(
    "misc/bedrock_docs.pdf"
)

pages = []
for doc in loader.lazy_load():
    pages.append(doc)
    if len(pages) >= 10:
        # do some paged operation, e.g.
        # index.upsert(page)

        pages = []
len(pages)