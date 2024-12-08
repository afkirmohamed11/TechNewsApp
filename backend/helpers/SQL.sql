-- Create the blog posts table
CREATE DATABASE TECHNEWS;
USE TECHNEWS;
CREATE TABLE tech_articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Category VARCHAR(100) NOT NULL,
    imagePath VARCHAR(500),
    Date_of_publication DATE NOT NULL,
    Description TEXT,
    Content LONGTEXT NOT NULL,
    Latest BOOLEAN DEFAULT True
);

-- Insert sample data focused on tech categories
INSERT INTO tech_articles (Title, Category, imagePath, Date_of_publication, Description, Content, Latest) VALUES 
(
    'The Rise of Generative AI: Transforming Industries', 
    'AI', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\generative-ai.jpg', 
    '2024-06-15', 
    'Exploring how generative AI is revolutionizing various sectors', 
    'Generative AI has emerged as a groundbreaking technology, reshaping industries from software development to creative fields. This article delves into the latest advancements in AI models, their applications, and the ethical considerations surrounding their rapid development...',
    TRUE
),
(
    'Blockchain Beyond Cryptocurrency: Real-World Applications', 
    'Blockchain', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\blockchain-tech.jpg', 
    '2024-05-22', 
    'Innovative use cases of blockchain technology in various industries', 
    'Blockchain is no longer just about cryptocurrencies. This comprehensive exploration reveals how decentralized technologies are transforming supply chains, healthcare, voting systems, and more. We examine the potential of smart contracts and distributed ledger technologies...',
    FALSE
),
(
    'Next-Generation Web Development: Trends for 2024', 
    'Web-Development', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\web-dev-trends.jpg', 
    '2024-04-10', 
    'Cutting-edge technologies shaping the future of web development', 
    'From server-side rendering to progressive web apps, this article breaks down the most exciting trends in web development. We explore the impact of frameworks like React, Vue, and the emerging technologies that are changing how we build interactive web experiences...',
    TRUE
),
(
    'Quantum Computing: Breaking the Computational Barriers', 
    'Quantum Computing', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\quantum-computing.jpg', 
    '2024-03-05', 
    'Understanding the potential of quantum computing', 
    'Quantum computing stands at the frontier of technological innovation. This deep dive explores how quantum mechanics is revolutionizing computational capabilities, potential breakthrough applications in cryptography, scientific research, and the challenges of quantum technology...',
    FALSE
),
(
    'Cybersecurity in the Age of Advanced Threats', 
    'Cybersecurity', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\quantum-computing.jpg', 
    '2024-02-18', 
    'Navigating the complex landscape of modern cyber threats', 
    'As digital infrastructure becomes more complex, cybersecurity challenges evolve at an unprecedented rate. This article examines the latest threat landscapes, emerging protection technologies, AI-powered security solutions, and strategic approaches to defending against sophisticated cyber attacks...',
    TRUE
);
INSERT INTO tech_articles (Title, Category, imagePath, Date_of_publication, Description, Content, Latest) VALUES 
(
    'Edge Computing: The Next Frontier of Data Processing', 
    'Cloud Computing', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\quantum-computing.jpg', 
    '2024-01-15', 
    'Exploring the revolutionary potential of edge computing technologies', 
    'Edge computing is transforming how we process and analyze data by bringing computational capabilities closer to the data source. This comprehensive article explores how edge computing is changing industries, from IoT and 5G networks to real-time analytics and autonomous systems...',
    FALSE
),
(
    'Machine Learning in Healthcare: Revolutionizing Diagnosis', 
    'AI', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\quantum-computing.jpg', 
    '2024-07-01', 
    'How AI is transforming medical diagnostics and patient care', 
    'Machine learning algorithms are creating unprecedented breakthroughs in medical imaging, predictive diagnostics, and personalized treatment plans. This in-depth exploration reveals how AI is helping doctors detect diseases earlier, optimize treatment strategies, and improve patient outcomes...',
    TRUE
),
(
    'The Future of 5G and 6G Networks', 
    'Telecommunications', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\quantum-computing.jpg', 
    '2024-05-10', 
    'Next-generation telecommunications technologies', 
    'As 5G networks continue to expand globally, researchers are already looking ahead to 6G technologies. This article provides a comprehensive overview of the current state of 5G, emerging 6G concepts, and how these network technologies will reshape communication, IoT, and digital infrastructure...',
    FALSE
),
(
    'Ethical AI: Navigating the Complex Landscape of Responsible Technology', 
    'AI Ethics', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\quantum-computing.jpg', 
    '2024-04-25', 
    'Addressing the moral and social implications of artificial intelligence', 
    'As AI becomes increasingly sophisticated, critical questions about ethics, bias, and societal impact emerge. This thought-provoking article examines the challenges of developing responsible AI, exploring frameworks for ethical AI development, potential risks, and strategies for mitigating unintended consequences...',
    TRUE
),
(
    'Augmented Reality in Enterprise: Beyond Gaming and Entertainment', 
    'Emerging Technologies', 
    'C:\\Users\\Dell\\OneDrive\\Bureau\\project\\frontend\\images\\quantum-computing.jpg', 
    '2024-06-05', 
    'Transformative applications of AR in business and industry', 
    'Augmented Reality (AR) is no longer just a consumer technology. This comprehensive analysis showcases how enterprises are leveraging AR for training, maintenance, design, and remote collaboration. From manufacturing to healthcare, we explore real-world use cases that demonstrate AR''s potential to revolutionize workplace productivity...',
    FALSE
);