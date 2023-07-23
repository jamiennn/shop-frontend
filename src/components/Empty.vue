<script setup>
import router from '@/router'
import { useAuthenticator } from '@/stores/authenticator'
const authenticator = useAuthenticator()
router.replace({ path: `/users/${authenticator.currentMember.id}/products` })
</script>