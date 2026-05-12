import re
import os
from groq import Groq

STOP_WORDS = {
    "and", "the", "are", "have", "our", "with", "for", "that", "this",
    "you", "your", "will", "was", "were", "been", "being", "they",
    "their", "them", "from", "into", "about", "which", "when", "who",
    "how", "what", "where", "should", "would", "could", "must", "may",
    "can", "not", "but", "also", "all", "any", "each", "both", "few",
    "more", "most", "other", "some", "such", "than", "too", "very",
    "just", "like", "well", "own", "same", "so", "do", "did", "does",
    "its", "it", "is", "in", "on", "at", "to", "of", "a", "an", "as",
    "be", "by", "or", "if", "we", "us", "me", "my", "he", "she", "his",
    "her", "up", "out", "no", "go", "new", "get", "use", "look", "only",
    "over", "think", "also", "back", "after", "work", "first", "well",
    "way", "even", "want", "because", "these", "give", "most", "write",
    "need", "required", "responsibilities", "ideal", "candidate",
    "looking", "preferred", "understand", "understanding", "develop",
    "collaborate", "maintain", "optimize", "participate", "join",
    "reviews", "review", "clean", "efficient", "motivated", "passion",
    "speed", "scalability", "scalable", "software", "systems", "team",
    "testing", "tools", "knowledge", "familiarity", "problem", "solving",
    "code", "designers", "developers", "engineer", "intern", "node",
    "html", "have", "build", "building", "applications"
}

def generate_jd_suggestion(matched, missing, score):
    """
    Use Groq to generate specific, actionable advice based on keyword match results.
    Falls back to a generic message if the API call fails.
    """
    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        prompt = f"""A candidate has a {score}% keyword match for a job.
Matched skills: {', '.join(matched[:10]) if matched else 'none'}
Missing skills: {', '.join(missing[:10]) if missing else 'none'}
Write 2-3 sentences of specific, actionable advice to improve their resume for this job. Be direct and practical."""
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"JD suggestion generation error: {e}")
        if missing:
            return f"Consider adding {', '.join(missing[:3])} to your resume to improve alignment with this role."
        return "Your resume aligns well with this job description."

def analyze_jd(jd_text, resume_text):
    """
    Analyze job description against resume and return keyword match results.
    Returns score, matched keywords, missing keywords, and suggestion.
    """

    # Extract keywords — filter out stop words and short words
    def extract_keywords(text):
        words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
        return {w for w in words if w not in STOP_WORDS}

    jd_keywords = extract_keywords(jd_text)
    resume_keywords = extract_keywords(resume_text)

    matched_keywords = sorted(list(jd_keywords & resume_keywords))
    missing_keywords = sorted(list(jd_keywords - resume_keywords))
    score = int((len(matched_keywords) / len(jd_keywords)) * 100) if jd_keywords else 0

    # Generate AI suggestion via Groq
    suggestion = generate_jd_suggestion(matched_keywords, missing_keywords, score)

    
    # Role to skill keyword mapping
    role_skill_map = {
        "data": ["data", "analysis", "sql", "excel", "dashboard", "statistics"],
        "data scientist": ["python", "machine", "learning", "ml", "deep", "ai"],
        "ai": ["ai", "nlp", "cnn", "deep", "neural", "transformer"],
        "node.js": ["node", "express", "jwt", "api"],
        "full stack": ["frontend", "backend", "react", "node", "api"],
        "django": ["django", "python", "rest", "api"],
        "cloud": ["aws", "cloud", "ec2", "lambda", "s3"],
        "devops": ["docker", "kubernetes", "ci", "cd", "jenkins"],
        "cybersecurity": ["security", "network", "malware", "phishing", "ids"]
    }

    # Project library
    project_library = {
        "data": [
            {
                "title": "Business Sales Dashboard",
                "description": "Interactive dashboard for sales insights.",
                "stack": ["Python", "Pandas", "Power BI"],
                "github": "https://github.com/search?q=sales+dashboard+python",
                "video": "https://www.youtube.com/results?search_query=sales+dashboard+power+bi",
                "article": "https://towardsdatascience.com/data-analysis-dashboard-with-python-8e6d6c0a9e3b"
            },
            {
                "title": "Customer Behavior Analysis",
                "description": "Analyze customer purchasing patterns.",
                "stack": ["Python", "SQL", "EDA"],
                "github": "https://github.com/search?q=customer+behavior+analysis+python",
                "video": "https://www.youtube.com/results?search_query=customer+behavior+analysis",
                "article": "https://towardsdatascience.com/customer-analysis-with-python-6f8a3b9d1e"
            },
            {
                "title": "A/B Testing System",
                "description": "Marketing A/B testing framework.",
                "stack": ["Python", "Statistics"],
                "github": "https://github.com/search?q=ab+testing+python",
                "video": "https://www.youtube.com/results?search_query=ab+testing+python",
                "article": "https://towardsdatascience.com/a-b-testing-with-python-4e5d6a9b2c"
            }
        ],
        "data scientist": [
            {
                "title": "Time Series Forecasting",
                "description": "Forecast trends using ARIMA & LSTM.",
                "stack": ["Python", "Time Series"],
                "github": "https://github.com/search?q=time+series+forecasting+python",
                "video": "https://www.youtube.com/results?search_query=time+series+forecasting",
                "article": "https://towardsdatascience.com/time-series-forecasting-with-python-4c7d1e8f"
            },
            {
                "title": "Fraud Detection System",
                "description": "Detect fraudulent transactions.",
                "stack": ["Python", "ML"],
                "github": "https://github.com/search?q=fraud+detection+machine+learning",
                "video": "https://www.youtube.com/results?search_query=fraud+detection+machine+learning",
                "article": "https://towardsdatascience.com/fraud-detection-with-machine-learning-98e3b1d1f6d"
            },
            {
                "title": "Recommendation Engine",
                "description": "Movie & product recommendations.",
                "stack": ["Python", "ML"],
                "github": "https://github.com/search?q=recommendation+system+python",
                "video": "https://www.youtube.com/results?search_query=recommendation+system+machine+learning",
                "article": "https://towardsdatascience.com/building-a-recommendation-system-with-python-5f4a2d6a1d"
            }
        ],
        "ai": [
            {
                "title": "AI Chatbot",
                "description": "Conversational chatbot using NLP.",
                "stack": ["Python", "NLP"],
                "github": "https://github.com/search?q=ai+chatbot+python",
                "video": "https://www.youtube.com/results?search_query=ai+chatbot+nlp",
                "article": "https://towardsdatascience.com/building-an-ai-chatbot-from-scratch-9f4c3b2a1d"
            },
            {
                "title": "Image Classification",
                "description": "CNN based image classifier.",
                "stack": ["Python", "CNN"],
                "github": "https://github.com/search?q=image+classification+cnn",
                "video": "https://www.youtube.com/results?search_query=image+classification+cnn",
                "article": "https://towardsdatascience.com/image-classification-with-deep-learning-4b7a2d6a1d"
            },
            {
                "title": "Speech Recognition App",
                "description": "Speech to text AI system.",
                "stack": ["Python", "AI"],
                "github": "https://github.com/search?q=speech+recognition+python",
                "video": "https://www.youtube.com/results?search_query=speech+recognition+python",
                "article": "https://towardsdatascience.com/speech-recognition-with-python-1a2b3c4d5e"
            }
        ],
        "node.js": [
            {
                "title": "REST API with Express",
                "description": "Scalable REST API.",
                "stack": ["Node.js", "Express"],
                "github": "https://github.com/search?q=nodejs+rest+api",
                "video": "https://www.youtube.com/results?search_query=nodejs+rest+api",
                "article": "https://www.freecodecamp.org/news/build-a-rest-api-with-node-js-express/"
            },
            {
                "title": "JWT Authentication",
                "description": "Secure auth system.",
                "stack": ["Node.js", "JWT"],
                "github": "https://github.com/search?q=nodejs+jwt+authentication",
                "video": "https://www.youtube.com/results?search_query=nodejs+jwt",
                "article": "https://www.freecodecamp.org/news/how-to-secure-your-node-js-application-with-jwt/"
            },
            {
                "title": "Real-Time Chat App",
                "description": "Socket.io chat application.",
                "stack": ["Node.js", "Socket.io"],
                "github": "https://github.com/search?q=nodejs+chat+application",
                "video": "https://www.youtube.com/results?search_query=nodejs+chat+app",
                "article": "https://www.freecodecamp.org/news/build-a-chat-app/"
            }
        ],
        "full stack": [
            {
                "title": "MERN Job Portal",
                "description": "Full stack job portal.",
                "stack": ["MongoDB", "React", "Node"],
                "github": "https://github.com/search?q=mern+job+portal",
                "video": "https://www.youtube.com/results?search_query=mern+job+portal",
                "article": "https://www.freecodecamp.org/news/build-a-mern-stack-app/"
            },
            {
                "title": "E-Commerce Platform",
                "description": "Full stack ecommerce app.",
                "stack": ["React", "Node"],
                "github": "https://github.com/search?q=full+stack+ecommerce+project",
                "video": "https://www.youtube.com/results?search_query=full+stack+ecommerce",
                "article": "https://www.freecodecamp.org/news/build-an-ecommerce-site/"
            },
            {
                "title": "Social Media Platform",
                "description": "Social networking app.",
                "stack": ["React", "Node"],
                "github": "https://github.com/search?q=full+stack+social+media+project",
                "video": "https://www.youtube.com/results?search_query=full+stack+social+media",
                "article": "https://www.freecodecamp.org/news/build-a-social-network/"
            }
        ],
        "cloud": [
            {
                "title": "Cloud Resume Challenge",
                "description": "Deploy resume on AWS.",
                "stack": ["AWS", "Lambda"],
                "github": "https://github.com/search?q=cloud+resume+challenge",
                "video": "https://www.youtube.com/results?search_query=cloud+resume+challenge",
                "article": "https://cloudresumechallenge.dev/docs/the-challenge/"
            },
            {
                "title": "Serverless API",
                "description": "AWS Lambda API.",
                "stack": ["AWS", "API Gateway"],
                "github": "https://github.com/search?q=aws+serverless+api",
                "video": "https://www.youtube.com/results?search_query=aws+serverless+api",
                "article": "https://www.serverless.com/blog/serverless-rest-api"
            },
            {
                "title": "Cloud Monitoring",
                "description": "AWS CloudWatch monitoring.",
                "stack": ["AWS", "CloudWatch"],
                "github": "https://github.com/search?q=aws+cloudwatch+project",
                "video": "https://www.youtube.com/results?search_query=aws+cloudwatch",
                "article": "https://docs.aws.amazon.com/cloudwatch/"
            }
        ],
        "devops": [
            {
                "title": "CI/CD Pipeline",
                "description": "Jenkins CI/CD setup.",
                "stack": ["Jenkins", "Docker"],
                "github": "https://github.com/search?q=jenkins+cicd+pipeline",
                "video": "https://www.youtube.com/results?search_query=jenkins+cicd",
                "article": "https://www.jenkins.io/doc/tutorials/"
            },
            {
                "title": "Dockerized Microservices",
                "description": "Microservices with Docker.",
                "stack": ["Docker"],
                "github": "https://github.com/search?q=docker+microservices",
                "video": "https://www.youtube.com/results?search_query=docker+microservices",
                "article": "https://www.docker.com/get-started/"
            },
            {
                "title": "Kubernetes Deployment",
                "description": "Deploy apps on Kubernetes.",
                "stack": ["Kubernetes"],
                "github": "https://github.com/search?q=kubernetes+deployment+project",
                "video": "https://www.youtube.com/results?search_query=kubernetes+deployment",
                "article": "https://kubernetes.io/docs/tutorials/"
            }
        ],
        "cybersecurity": [
            {
                "title": "Phishing Detection",
                "description": "Detect phishing URLs.",
                "stack": ["Python", "Security"],
                "github": "https://github.com/search?q=phishing+detection+python",
                "video": "https://www.youtube.com/results?search_query=phishing+detection",
                "article": "https://towardsdatascience.com/phishing-detection-with-machine-learning-3c4d5e6f"
            },
            {
                "title": "Malware Detection",
                "description": "Malware classifier.",
                "stack": ["Python", "ML"],
                "github": "https://github.com/search?q=malware+detection+python",
                "video": "https://www.youtube.com/results?search_query=malware+detection",
                "article": "https://towardsdatascience.com/malware-detection-using-machine-learning-9f4a2d6c"
            },
            {
                "title": "Intrusion Detection",
                "description": "Network IDS system.",
                "stack": ["Python", "IDS"],
                "github": "https://github.com/search?q=intrusion+detection+system",
                "video": "https://www.youtube.com/results?search_query=intrusion+detection",
                "article": "https://towardsdatascience.com/intrusion-detection-system-using-machine-learning-3fdb6d4a9b"
            }
        ]
    }

    # Smart matching
    suggested_projects = []
    jd_text_full = jd_text.lower()
    for role, skills in role_skill_map.items():
        if any(skill in jd_text_full for skill in skills):
            suggested_projects.extend(project_library.get(role, []))

    # Deduplicate by title
    seen = set()
    unique_projects = []
    for p in suggested_projects:
        if p["title"] not in seen:
            seen.add(p["title"])
            unique_projects.append(p)
    suggested_projects = unique_projects[:6]

    # Fallback
    if not suggested_projects:
        suggested_projects = [
            {
                "title": "AI Resume Analyzer",
                "description": "AI resume screening project.",
                "stack": ["Python", "NLP"],
                "github": "https://github.com/search?q=resume+analyzer",
                "video": "https://www.youtube.com/results?search_query=resume+analyzer+project",
                "article": "https://medium.com/search?q=resume+analyzer"
            }
        ]

    return {
    "score": score,
    "matched": matched_keywords,
    "missing": missing_keywords,
    "suggestion": suggestion,
    "suggested_projects": suggested_projects
    }