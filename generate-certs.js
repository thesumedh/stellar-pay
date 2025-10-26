const { execSync } = require('child_process');

try {
  // Generate self-signed certificate for localhost
  execSync('openssl req -x509 -out localhost.pem -keyout localhost-key.pem -newkey rsa:2048 -nodes -sha256 -subj "/CN=localhost" -extensions EXT -config <(printf "[dn]\\nCN=localhost\\n[req]\\ndistinguished_name = dn\\n[EXT]\\nsubjectAltName=DNS:localhost\\nkeyUsage=digitalSignature\\nextendedKeyUsage=serverAuth")', { shell: '/bin/bash' });
  console.log('✅ SSL certificates generated');
} catch (error) {
  console.log('❌ OpenSSL not found. Use Option 1 instead.');
}