def analyze_skill_gap(job_role, resume_text, additional_skills=None):
    """
    Analyze skill gap between job role requirements and resume content.
    Returns found skills, missing skills, resume score, suggestions, and interview questions.
    """

    # Job skills mapping
    job_skills = {
        "java developer": [
            "java", "sql", "cloud computing"
        ],
        "python developer": [
            "python", "sql", "machine learning", "ai"
        ],
        "data analyst": [
            "python", "sql", "big data", "statistics"
        ],
        "project manager": [
            "cloud computing", "networking"
        ],
        "data scientist": [
            "python", "machine learning", "deep learning", "ai", "big data"
        ],
        "aiml engineer": [
            "python", "machine learning", "deep learning", "ai"
        ],
        "software developer": [
            "java", "python", "sql"
        ],
        "full stack developer": [
            "react", "nodejs", "sql", "cloud computing"
        ],
        "frontend developer": [
            "react", "javascript"
        ],
        "backend developer": [
            "java", "python", "sql", "nodejs"
        ],
        "cloud engineer": [
            "cloud computing", "kubernetes", "networking"
        ],
        "devops engineer": [
            "cloud computing", "kubernetes", "networking"
        ],
        "cybersecurity analyst": [
            "cybersecurity", "networking", "cloud computing"
        ],
        "big data engineer": [
            "big data", "python", "sql", "cloud computing"
        ],
        "network engineer": [
            "networking", "cybersecurity"
        ],
        "ai engineer": [
            "ai", "machine learning", "deep learning", "python"
        ]
    }

    expected = job_skills.get(job_role.lower(), [])

    # Add additional skills if provided
    if additional_skills:
        additional_list = [s.strip().lower() for s in additional_skills.split(",") if s.strip()]
        expected.extend(additional_list)

    # Find skills in resume
    resume_text_lower = resume_text.lower()
    found_skills = [s for s in expected if s in resume_text_lower]
    missing_skills = [s for s in expected if s not in found_skills]

    # Calculate score
    resume_score = int((len(found_skills) / len(expected)) * 100) if expected else 0

    # Course suggestions
    suggestions = []
    for skill in missing_skills:
        suggestions.append({
            "skill": skill.title(),
            "courses": [
                {"title": f"{skill.title()} – Coursera", "link": f"https://www.coursera.org/search?query={skill}"},
                {"title": f"{skill.title()} – Udemy", "link": f"https://www.udemy.com/courses/search/?q={skill}"},
                {"title": f"{skill.title()} – YouTube", "link": f"https://www.youtube.com/results?search_query={skill}"}
            ]
        })

    # Interview questions bank
    interview_bank = {
        "java developer": [
            "Explain OOP concepts",
            "What is JVM and JDK?",
            "Explain Collections Framework",
            "Difference between abstract class and interface",
            "What is multithreading?",
            "Explain garbage collection",
            "What is exception handling?",
            "Difference between HashMap and Hashtable",
            "What are streams in Java?",
            "Explain SOLID principles"
        ],
        "python developer": [
            "Explain GIL",
            "What are decorators?",
            "Difference between list and tuple",
            "What is list comprehension?",
            "Explain generators",
            "What is lambda function?",
            "Difference between deep copy and shallow copy",
            "What are Python modules and packages?",
            "Explain exception handling in Python",
            "What is virtual environment?"
        ],
        "data analyst": [
            "Explain ETL process",
            "What is A/B testing?",
            "Difference between OLAP and OLTP",
            "What is data cleaning?",
            "Explain descriptive vs inferential statistics",
            "What are KPIs?",
            "Explain data visualization best practices",
            "Difference between mean and median",
            "What is correlation?",
            "Explain pivot tables"
        ],
        "data scientist": [
            "Difference between supervised and unsupervised learning",
            "Explain overfitting and underfitting",
            "What is feature engineering?",
            "Explain bias-variance tradeoff",
            "What is cross validation?",
            "Difference between classification and regression",
            "Explain confusion matrix",
            "What is ROC curve?",
            "What is dimensionality reduction?",
            "Explain PCA"
        ],
        "aiml engineer": [
            "What is machine learning?",
            "Difference between AI and ML",
            "Explain neural networks",
            "What is backpropagation?",
            "Difference between CNN and RNN",
            "Explain activation functions",
            "What is model deployment?",
            "Explain hyperparameter tuning",
            "What is transfer learning?",
            "Explain reinforcement learning"
        ],
        "software developer": [
            "Explain SDLC",
            "What is version control?",
            "Difference between Agile and Waterfall",
            "What is REST API?",
            "Explain MVC architecture",
            "What is debugging?",
            "Explain code optimization",
            "Difference between frontend and backend",
            "What is unit testing?",
            "Explain design patterns"
        ],
        "full stack developer": [
            "Explain SDLC",
            "What is REST API?",
            "Explain MVC architecture",
            "What is version control?",
            "Difference between frontend and backend",
            "What is unit testing?",
            "Explain CI/CD pipeline",
            "What is containerization?",
            "Explain database design",
            "What is authentication?"
        ],
        "frontend developer": [
            "What is React?",
            "Explain component lifecycle",
            "Difference between state and props",
            "What is JSX?",
            "Explain virtual DOM",
            "What are hooks in React?",
            "Difference between class and functional components",
            "What is responsive design?",
            "Explain CSS preprocessors",
            "What is webpack?"
        ],
        "backend developer": [
            "What is REST API?",
            "Explain MVC architecture",
            "What is database normalization?",
            "Difference between SQL and NoSQL",
            "What is authentication?",
            "Explain caching",
            "What is microservices?",
            "Explain API security",
            "What is ORM?",
            "Explain database indexing"
        ],
        "cloud engineer": [
            "What is cloud computing?",
            "Difference between IaaS, PaaS, SaaS",
            "What is virtualization?",
            "Explain public vs private cloud",
            "What is load balancing?",
            "What is auto scaling?",
            "Explain cloud security",
            "What is containerization?",
            "Difference between Docker and VM",
            "Explain AWS EC2"
        ],
        "devops engineer": [
            "What is DevOps?",
            "Explain CI/CD pipeline",
            "What is Docker?",
            "What is Kubernetes?",
            "Explain infrastructure as code",
            "Difference between Jenkins and GitHub Actions",
            "What is monitoring?",
            "Explain configuration management",
            "What is blue-green deployment?",
            "Explain version control systems"
        ],
        "cybersecurity analyst": [
            "What is cybersecurity?",
            "Explain CIA triad",
            "What is phishing?",
            "Difference between vulnerability and threat",
            "What is firewall?",
            "Explain encryption and decryption",
            "What is malware?",
            "Explain penetration testing",
            "What is IDS and IPS?",
            "What is zero trust security?"
        ],
        "big data engineer": [
            "What is big data?",
            "Explain Hadoop ecosystem",
            "What is MapReduce?",
            "Difference between batch and stream processing",
            "What is Apache Spark?",
            "Explain data lake vs data warehouse",
            "What is ETL?",
            "Explain distributed computing",
            "What is NoSQL databases?",
            "Explain data partitioning"
        ],
        "network engineer": [
            "What is TCP/IP?",
            "Explain OSI model",
            "Difference between hub, switch, router",
            "What is subnetting?",
            "Explain VLAN",
            "What is firewall?",
            "Explain VPN",
            "What is DNS?",
            "Explain DHCP",
            "What is network security?"
        ],
        "ai engineer": [
            "What is machine learning?",
            "Difference between AI and ML",
            "Explain neural networks",
            "What is backpropagation?",
            "Explain activation functions",
            "What is model deployment?",
            "Explain hyperparameter tuning",
            "What is transfer learning?",
            "Explain reinforcement learning",
            "What is computer vision?"
        ]
    }

    interview_questions = interview_bank.get(job_role.lower(), [])

    return {
        "job_role": job_role,
        "resume_score": resume_score,
        "ats_result": {
            "found": found_skills,
            "missing": missing_skills
        },
        "suggestions": suggestions,
        "interview_questions": interview_questions
    }
