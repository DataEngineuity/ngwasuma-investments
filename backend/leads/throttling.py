"""
Rate limiting for anonymous lead submissions.

Two stacked throttles per IP:

  * BurstAnonThrottle   — short window, catches rapid-fire spam.
  * SustainedAnonThrottle — wider window, catches slow-drip spam.

Rates are configured in settings.REST_FRAMEWORK['DEFAULT_THROTTLE_RATES'].
"""

from rest_framework.throttling import AnonRateThrottle


class BurstAnonThrottle(AnonRateThrottle):
    scope = 'anon_burst'


class SustainedAnonThrottle(AnonRateThrottle):
    scope = 'anon_sustained'
