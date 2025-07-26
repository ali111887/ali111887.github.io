<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <!-- Header -->
    <header class="glass-effect sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span class="text-white font-bold text-xl">{{ resumeData.personal.initials }}</span>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ resumeData.personal.name }}</h1>
              <p class="text-gradient font-medium">{{ resumeData.personal.title }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <button 
              @click="toggleTheme" 
              class="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <SunIcon v-if="isDark" class="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
              <MoonIcon v-else class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              @click="downloadPDF" 
              :disabled="isLoading"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download PDF"
            >
              <DocumentArrowDownIcon v-if="!isLoading" class="w-5 h-5" />
              <div v-else class="animate-spin w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full"></div>
              <span>{{ isLoading ? 'Generating...' : 'PDF' }}</span>
            </button>
            <button 
              @click="printResume" 
              class="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <PrinterIcon class="w-5 h-5" />
              <span>Print CV</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Print Header (Hidden by default) -->
    <div class="print-header">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ resumeData.personal.name }}</h1>
        <p class="text-xl text-gray-600 mb-4">{{ resumeData.personal.title }}</p>
        <div class="flex justify-center space-x-6 text-sm text-gray-500">
          <span>{{ resumeData.personal.email }}</span>
          <span>{{ resumeData.personal.phone }}</span>
          <span>{{ resumeData.personal.location }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 print-content">
        <!-- Left Column -->
        <div class="lg:col-span-1 space-y-6 print-section">
          <!-- Contact Information -->
          <ResumeSection title="Contact" class="animate-fade-in">
            <div class="space-y-4">
              <div class="flex items-center group">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                  <EnvelopeIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <a :href="`mailto:${resumeData.personal.email}`" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {{ resumeData.personal.email }}
                </a>
              </div>
              <div class="flex items-center group">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                  <PhoneIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <a :href="`tel:${resumeData.personal.phone}`" class="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  {{ resumeData.personal.phone }}
                </a>
              </div>
              <div class="flex items-center group">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                  <MapPinIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <span class="text-gray-700 dark:text-gray-300">{{ resumeData.personal.location }}</span>
              </div>
              <div class="flex items-center group">
                <div class="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                  <GlobeAltIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <a :href="resumeData.personal.linkedin" target="_blank" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </ResumeSection>

          <!-- Skills -->
          <ResumeSection title="Skills" class="animate-fade-in">
            <div class="space-y-6">
              <div v-for="(skills, category) in resumeData.skills" :key="category" class="animate-slide-up">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <div class="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                  {{ category }}
                </h3>
                <div class="flex flex-wrap">
                  <span v-for="skill in skills" :key="skill" class="skill-tag">
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </ResumeSection>

          <!-- Education -->
          <ResumeSection title="Education" class="animate-fade-in">
            <div class="space-y-4">
              <div v-for="edu in resumeData.education" :key="edu.degree" class="animate-slide-up">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ edu.degree }}</h3>
                <p class="text-gray-600 dark:text-gray-400">{{ edu.school }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-500">{{ edu.period }}</p>
                <p v-if="edu.details" class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ edu.details }}</p>
              </div>
            </div>
          </ResumeSection>
        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2 space-y-6 print-section">
          <!-- Professional Summary -->
          <ResumeSection title="Professional Summary" class="animate-fade-in">
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {{ resumeData.personal.summary }}
            </p>
          </ResumeSection>

          <!-- Work Experience -->
          <ResumeSection title="Work Experience" class="animate-fade-in">
            <div class="space-y-8">
              <ExperienceItem
                v-for="(exp, index) in resumeData.experience"
                :key="exp.title"
                :title="exp.title"
                :company="exp.company"
                :period="exp.period"
                :achievements="exp.achievements"
                :class="`animate-slide-up delay-${index * 100}`"
              />
            </div>
          </ResumeSection>

          <!-- Projects -->
          <ResumeSection title="Projects" class="animate-fade-in">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="(project, index) in resumeData.projects" 
                :key="project.title" 
                class="card animate-slide-up hover-lift gradient-border"
                :style="`animation-delay: ${index * 100}ms`"
              >
                <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-lg">{{ project.title }}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {{ project.description }}
                </p>
                <div class="flex flex-wrap">
                  <span v-for="tech in project.technologies" :key="tech" class="skill-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </ResumeSection>

          <!-- Certifications -->
          <ResumeSection v-if="resumeData.certifications && resumeData.certifications.length > 0" title="Certifications" class="animate-fade-in">
            <div class="space-y-4">
              <div v-for="cert in resumeData.certifications" :key="cert.name" class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <span class="text-gray-700 dark:text-gray-300 font-medium">{{ cert.name }}</span>
                <span class="text-sm text-gray-500 dark:text-gray-500 bg-white dark:bg-gray-700 px-3 py-1 rounded-full">{{ cert.year }}</span>
              </div>
            </div>
          </ResumeSection>
        </div>
      </div>
    </main>

    <!-- Floating Action Button for Mobile -->
    <div class="fixed bottom-6 right-6 lg:hidden z-40">
      <button 
        @click="printResume" 
        class="w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <PrinterIcon class="w-6 h-6" />
      </button>
    </div>

    <!-- Notification -->
    <div 
      v-if="showNotification" 
      class="fixed top-4 right-4 z-50 animate-slide-up"
      :class="{
        'bg-green-500': notificationType === 'success',
        'bg-blue-500': notificationType === 'info',
        'bg-red-500': notificationType === 'error'
      }"
    >
      <div class="text-white px-6 py-3 rounded-lg shadow-lg">
        {{ notificationMessage }}
      </div>
    </div>

    <!-- Loading Overlay -->
    <div 
      v-if="isLoading" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center space-x-3">
        <div class="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"></div>
        <span class="text-gray-700 dark:text-gray-300">Generating PDF...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { 
  SunIcon, 
  MoonIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  GlobeAltIcon,
  PrinterIcon,
  DocumentArrowDownIcon
} from '@heroicons/vue/24/outline'
import { resumeData } from '~/data/resume'

const isDark = ref(false)
const isLoading = ref(false)
const showNotification = ref(false)
const notificationMessage = ref('')
const notificationType = ref('success')

// Initialize theme from localStorage or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    isDark.value = systemPrefersDark
  }
  
  applyTheme()
})

// Watch for theme changes and apply them
watch(isDark, (newValue) => {
  applyTheme()
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
})

const applyTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const printResume = () => {
  // Add print-specific styles
  const style = document.createElement('style')
  style.textContent = `
    @media print {
      body { margin: 0; padding: 20px; }
      header, .fixed { display: none !important; }
      .card { box-shadow: none !important; border: 1px solid #e5e7eb !important; }
      .skill-tag { background: #f3f4f6 !important; color: #374151 !important; }
      .animate-fade-in, .animate-slide-up { animation: none !important; }
      .print-header { display: block !important; }
      .print-content { display: grid !important; grid-template-columns: 1fr !important; }
      .print-section { break-inside: avoid !important; }
    }
  `
  document.head.appendChild(style)
  
  window.print()
  
  // Clean up
  setTimeout(() => {
    document.head.removeChild(style)
  }, 1000)
}

const showNotificationMessage = (message, type = 'success') => {
  notificationMessage.value = message
  notificationType.value = type
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const downloadPDF = async () => {
  try {
    isLoading.value = true
    showNotificationMessage('Generating PDF...', 'info')
    
    // Import html2pdf dynamically
    const html2pdf = (await import('html2pdf.js')).default
    
    // Create a clone of the resume content for PDF
    const resumeContent = document.querySelector('main').cloneNode(true)
    const printHeader = document.querySelector('.print-header').cloneNode(true)
    
    // Create a temporary container
    const tempContainer = document.createElement('div')
    tempContainer.style.cssText = `
      background: white;
      padding: 40px;
      font-family: 'Inter', sans-serif;
      max-width: 800px;
      margin: 0 auto;
    `
    
    // Add header and content
    tempContainer.appendChild(printHeader)
    tempContainer.appendChild(resumeContent)
    
    // Configure PDF options
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${resumeData.personal.name.replace(/\s+/g, '_')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    }
    
    // Generate PDF
    await html2pdf().set(opt).from(tempContainer).save()
    
    isLoading.value = false
    showNotificationMessage('PDF downloaded successfully!', 'success')
    
  } catch (error) {
    console.error('PDF generation failed:', error)
    isLoading.value = false
    showNotificationMessage('PDF generation failed. Using print instead.', 'error')
    // Fallback to print
    printResume()
  }
}
</script>

<style scoped>
/* Custom animations with delays */
.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Print styles */
@media print {
  @page {
    margin: 1in;
    size: A4;
  }
  
  body {
    font-size: 12pt;
    line-height: 1.4;
  }
  
  .card {
    break-inside: avoid;
    margin-bottom: 1rem;
  }
  
  .skill-tag {
    background: #f3f4f6 !important;
    color: #374151 !important;
    border: 1px solid #d1d5db !important;
  }
}
</style> 