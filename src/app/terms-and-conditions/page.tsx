import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
	return (
		<main className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<Link href="/" className="mb-4 inline-flex items-center text-blue-400 transition-colors hover:text-blue-300">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Home
				</Link>
				<h1 className="mb-2 text-4xl font-extrabold">Terms of Service</h1>
				<p className="text-gray-400">Last updated: January 30, 2025</p>
			</div>

			<div className="prose prose-invert max-w-none">
				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						By accessing and using Twitter Clone (&quot;the Service&quot;), you accept and agree to be bound by the
						terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
						service.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">2. Description of Service</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						Twitter Clone is a social media platform that allows users to post short messages, follow other users, and
						engage with content through likes, retweets, and comments. The Service is provided &quot;as is&quot; and is
						intended for demonstration and educational purposes.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">3. User Accounts</h2>
					<div className="space-y-4 leading-relaxed text-gray-300">
						<p>To access certain features of the Service, you must create an account. You agree to:</p>
						<ul className="ml-4 list-inside list-disc space-y-2">
							<li>Provide accurate and complete information when creating your account</li>
							<li>Maintain the security of your password and account</li>
							<li>Notify us immediately of any unauthorized use of your account</li>
							<li>Be responsible for all activities that occur under your account</li>
						</ul>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">4. User Content and Conduct</h2>
					<div className="space-y-4 leading-relaxed text-gray-300">
						<p>
							You are solely responsible for the content you post on the Service. You agree not to post content that:
						</p>
						<ul className="ml-4 list-inside list-disc space-y-2">
							<li>Is illegal, harmful, threatening, abusive, or defamatory</li>
							<li>Violates any intellectual property rights</li>
							<li>Contains spam, viruses, or malicious code</li>
							<li>Impersonates another person or entity</li>
							<li>Promotes violence or discrimination</li>
							<li>Contains adult content or is inappropriate for minors</li>
						</ul>
					</div>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">5. Intellectual Property</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						You retain ownership of the content you post on the Service. However, by posting content, you grant us a
						worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in
						connection with the Service.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">6. Privacy</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						Your privacy is important to us. Please review our{" "}
						<Link href="/privacy" className="text-accent hover:underline">
							Privacy Policy
						</Link>
						, which also governs your use of the Service.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">7. Termination</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						We may terminate or suspend your account and access to the Service at our sole discretion, without prior
						notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">8. Disclaimers</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						The Service is provided &quot;as is&quot; without any warranties, express or implied. We do not warrant that
						the Service will be uninterrupted, secure, or error-free. Your use of the Service is at your own risk.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">9. Limitation of Liability</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						In no event shall Twitter Clone be liable for any indirect, incidental, special, consequential, or punitive
						damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">10. Changes to Terms</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						We reserve the right to modify these Terms at any time. We will notify users of any material changes by
						posting the new Terms on this page. Your continued use of the Service after such modifications constitutes
						acceptance of the updated Terms.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="text-foreground mb-4 text-2xl font-semibold">11. Contact Information</h2>
					<p className="mb-4 leading-relaxed text-gray-300">
						If you have any questions about these Terms, please contact us at legal@twitter-clone.com.
					</p>
				</section>
			</div>
		</main>
	);
}
