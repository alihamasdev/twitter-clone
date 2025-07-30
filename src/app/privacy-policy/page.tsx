import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
	return (
		<main className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<Link href="/" className="mb-4 inline-flex items-center text-blue-400 transition-colors hover:text-blue-300">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Home
				</Link>
				<h1 className="mb-2 text-4xl font-extrabold">Privacy Policy</h1>
				<p className="text-gray-400">Last updated: January 30, 2025</p>
			</div>

			<div className="prose prose-invert max-w-none">
				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">1. Introduction</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						This Privacy Policy describes how Twitter Clone we collects, uses, and shares your personal information when
						you use our social media platform. We are committed to protecting your privacy and being transparent about
						our data practices.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">2. Information We Collect</h2>
					<div className="space-y-4 leading-relaxed text-gray-300">
						<h3 className="text-foreground text-xl font-bold">Information You Provide</h3>
						<ul className="ml-4 list-inside list-disc space-y-2">
							<li>Account information (username, email address, profile picture)</li>
							<li>Posts, comments, and other content you share</li>
							<li>Messages and communications with other users</li>
							<li>Profile information and preferences</li>
						</ul>

						<h3 className="text-foreground mt-6 text-xl font-bold">Information We Collect Automatically</h3>
						<ul className="ml-4 list-inside list-disc space-y-2">
							<li>Device information (IP address, browser type, operating system)</li>
							<li>Usage data (pages visited, time spent, interactions)</li>
							<li>Location information (if you enable location services)</li>
							<li>Cookies and similar tracking technologies</li>
						</ul>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">3. How We Use Your Information</h2>
					<div className="space-y-4 leading-relaxed text-gray-300">
						<p>We use your information to:</p>
						<ul className="ml-4 list-inside list-disc space-y-2">
							<li>Provide and maintain the Service</li>
							<li>Personalize your experience and content</li>
							<li>Communicate with you about the Service</li>
							<li>Improve and develop new features</li>
							<li>Ensure security and prevent fraud</li>
							<li>Comply with legal obligations</li>
							<li>Send you notifications and updates</li>
						</ul>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">4. Information Sharing</h2>
					<div className="space-y-4 leading-relaxed text-gray-300">
						<p>We may share your information in the following circumstances:</p>
						<ul className="ml-4 list-inside list-disc space-y-2">
							<li>
								<strong>Public Content:</strong> Posts and profile information you make public
							</li>
							<li>
								<strong>Service Providers:</strong> Third-party companies that help us operate the Service
							</li>
							<li>
								<strong>Legal Requirements:</strong> When required by law or to protect our rights
							</li>
							<li>
								<strong>Business Transfers:</strong> In connection with mergers or acquisitions
							</li>
							<li>
								<strong>Consent:</strong> When you give us permission to share your information
							</li>
						</ul>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">5. Data Security</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						We implement appropriate technical and organizational measures to protect your personal information against
						unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
						internet is 100% secure.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">6. Your Rights and Choices</h2>
					<div className="space-y-4 leading-relaxed text-gray-300">
						<p>You have the following rights regarding your personal information:</p>
						<ul className="ml-4 list-inside list-disc space-y-2">
							<li>
								<strong>Access:</strong> Request a copy of your personal information
							</li>
							<li>
								<strong>Correction:</strong> Update or correct inaccurate information
							</li>
							<li>
								<strong>Deletion:</strong> Request deletion of your personal information
							</li>
							<li>
								<strong>Portability:</strong> Request transfer of your data to another service
							</li>
							<li>
								<strong>Objection:</strong> Object to certain processing of your information
							</li>
							<li>
								<strong>Restriction:</strong> Request limitation of processing
							</li>
						</ul>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">7. Cookies and Tracking</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide
						personalized content. You can control cookie settings through your browser preferences, but some features
						may not function properly if cookies are disabled.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">8. Third-Party Services</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						Our Service may contain links to third-party websites or integrate with third-party services (such as Google
						and GitHub for authentication). We are not responsible for the privacy practices of these third parties.
						Please review their privacy policies separately.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">9. Children&apos;s Privacy</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						Our Service is not intended for children under 13 years of age. We do not knowingly collect personal
						information from children under 13. If you are a parent or guardian and believe your child has provided us
						with personal information, please contact us.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">10. International Data Transfers</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						Your information may be transferred to and processed in countries other than your own. We ensure appropriate
						safeguards are in place to protect your information in accordance with this Privacy Policy.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">11. Data Retention</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						We retain your personal information for as long as necessary to provide the Service and fulfill the purposes
						outlined in this Privacy Policy, unless a longer retention period is required by law.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">12. Changes to This Policy</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
						the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">13. Contact Us</h2>
					<div className="space-y-2 leading-relaxed text-gray-300">
						<p>If you have any questions about this Privacy Policy, please contact us:</p>
						<ul className="ml-4 list-none space-y-1">
							<li>
								Email:{" "}
								<a href="mailto:alihamasdev@gmail.com" className="text-accent hover:underline">
									alihamasdev@gmail.com
								</a>
							</li>
						</ul>
					</div>
				</section>
			</div>
		</main>
	);
}
